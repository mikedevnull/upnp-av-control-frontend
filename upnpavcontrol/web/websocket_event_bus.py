from . import json_rpc
import asyncio
from typing import Protocol, Callable, Awaitable
from upnpavcontrol.core.discovery import MediaDeviceDiscoveryEvent
from upnpavcontrol.core.mediarenderer import PlaybackInfo
from upnpavcontrol.core.oberserver import Subscription
_event_type_map = {'NEW_DEVICE': 'new_device', 'DEVICE_LOST': 'device_lost'}

MediaDeviceDiscoveryCallback = Callable[[MediaDeviceDiscoveryEvent], Awaitable]


class EventBusConnector(Protocol):
    async def subscribe_discovery_notifications(self, callback: MediaDeviceDiscoveryCallback) -> Subscription:
        ...

    async def subscribe_renderer_notifications(self, udn: str, callback: Callable[[str, PlaybackInfo],
                                                                                  Awaitable]) -> Subscription:
        ...


class EventBusConnection(object):
    def __init__(self, websocket, connector: EventBusConnector):
        self._websocket = websocket
        self._connector = connector
        self._discovery_subscription = None
        self._playback_subscriptions = {}

    async def handle(self):
        await self._websocket.send_text(
            json_rpc.JsonRPCNotification(method='initialize', params={
                'version': '0.2.0'
            }).json())
        while True:
            try:
                raw_request = await self._websocket.receive_text()
                request = json_rpc.parse_jsonrpc_request(raw_request)
                response = await self._handle_request(request)
                await self._websocket.send_text(response.json())
            except json_rpc.JsonRPCException as e:
                await self._websocket.send_text(e.to_response().json())

    async def _handle_request(self, request: json_rpc.JsonRPCRequest):
        if request.method not in ('subscribe', 'unsubscribe'):
            raise json_rpc.JsonRPCException(id=request.id, error=json_rpc.JSONRPC_METHOD_NOT_FOUND)
        if request.method == 'unsubscribe':
            return await self._handle_unsubscription(request)
        if request.method == 'subscribe':
            return await self._handle_subscription(request)
        return json_rpc.JsonRPCResponse(id=request.id, result=False)

    async def _handle_subscription(self, request):
        if request.params['category'] == 'discovery':
            if self._discovery_subscription is None:
                self._discovery_subscription = await self._connector.subscribe_discovery_notifications(
                    self._notify_discovery)
                return json_rpc.JsonRPCResponse(id=request.id, result=True)
        if request.params['category'] == 'playbackinfo':
            udn = request.params['udn']
            if udn not in self._playback_subscriptions:
                self._playback_subscriptions[udn] = await self._connector.subscribe_renderer_notifications(
                    udn, self._notifiy_playbackinfo)
                return json_rpc.JsonRPCResponse(id=request.id, result=True)
        return json_rpc.JsonRPCResponse(id=request.id, result=False)

    async def _handle_unsubscription(self, request):
        if request.params['category'] == 'discovery':
            if self._discovery_subscription is not None:
                await self._discovery_subscription.unsubscribe()
                self._discovery_subscription = None
                return json_rpc.JsonRPCResponse(id=request.id, result=True)
        if request.params['category'] == 'playbackinfo':
            udn = request.params['udn']
            if udn in self._playback_subscriptions:
                sub = self._playback_subscriptions.pop(udn)
                await sub.unsubscribe()
                return json_rpc.JsonRPCResponse(id=request.id, result=True)
        return json_rpc.JsonRPCResponse(id=request.id, result=False)

    async def _notify_discovery(self, event):
        assert event.event_type.name in _event_type_map
        method = _event_type_map[event.event_type.name]
        msg = json_rpc.JsonRPCNotification(method=method, params={'udn': event.udn, 'device_type': event.device_type})
        await self._websocket.send_text(msg.json())

    async def _notifiy_playbackinfo(self, udn, playbackinfo):
        msg = json_rpc.JsonRPCNotification(method='playbackinfo', params={'udn': udn, 'playbackinfo': playbackinfo})
        await self._websocket.send_text(msg.json())


class WebsocketEventBus(object):
    def __init__(self, connector: EventBusConnector):
        self._queue = asyncio.Queue()
        self._notification_sockets = []
        self._connector = connector
        self._task = None

    async def accept(self, websocket):
        await websocket.accept()
        connection = EventBusConnection(websocket, self._connector)
        await connection.handle()

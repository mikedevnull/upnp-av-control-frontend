from fastapi import APIRouter, Request, HTTPException
import logging
from pydantic import BaseModel, validator

router = APIRouter()


class RendererDevice(BaseModel):
    udn: str


def _format_device(device):
    return {'name': device.friendly_name, 'udn': device.udn}


class PlaybackInfo(BaseModel):
    player: str = None
    volume: int = None


class Volume(BaseModel):
    volume_percent: int

    @validator('volume_percent')
    def volume_percent_range(cls, v):
        if v < 0 or v > 100:
            raise ValueError('Volume out of range (0 <= volume <= 100)')
        return v


@router.get('', response_model=PlaybackInfo)
async def current_playback_info(request: Request):
    if request.app.av_control_point.mediarenderer is None:
        return {'player': None}
    else:
        volume = await request.app.av_control_point.mediarenderer.get_volume()
        return {'player': request.app.av_control_point.mediarenderer.udn, 'volume': volume}


@router.get('/devices')
def device_list(request: Request):
    return {'data': [_format_device(s) for s in request.app.av_control_point.mediarenderers]}


@router.put('/device')
async def set_active_player(request: Request, device: RendererDevice):
    try:
        logging.info('Select device: %s', device.udn)
        await request.app.av_control_point.set_renderer(device.udn)
    except KeyError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/volume', status_code=204)
async def set_player_volume(request: Request, volume: Volume):
    if request.app.av_control_point.mediarenderer is None:
        raise HTTPException(status_code=404)
    await request.app.av_control_point.mediarenderer.set_volume(volume.volume_percent)
    return ''

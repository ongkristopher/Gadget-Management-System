import json
from channels.generic.websocket import AsyncWebsocketConsumer

class GadgetConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = None
        if self.scope["user"].is_anonymous:
            await self.close()
            return
        self.user = self.scope["user"]
        self.group_name = f"gadgets_{self.user.id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def gadget_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))

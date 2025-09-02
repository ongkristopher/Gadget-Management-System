import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gadget_management_system.settings")

django_asgi_app = get_asgi_application()

from gadget_management_system.gadgets import consumers
from gadget_management_system.gadgets.middleware import JwtAuthMiddleware

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JwtAuthMiddleware(
        AuthMiddlewareStack(
            URLRouter([
                path("ws/gadgets/", consumers.GadgetConsumer.as_asgi()),
            ])
        )
    ),
})

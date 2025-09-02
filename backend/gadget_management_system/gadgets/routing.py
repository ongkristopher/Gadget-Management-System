# backend/gadget_management_system/routing.py
from django.urls import re_path
from gadget_management_system.gadgets.consumers import GadgetConsumer

websocket_urlpatterns = [
    re_path(r"ws/gadgets/$", GadgetConsumer.as_asgi()),
]

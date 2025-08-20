from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gadget_management_system.gadgets.views import GadgetViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r"gadgets", GadgetViewSet, basename="gadget")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),  # optional
    # Gadget API
    path("api/", include(router.urls)),
]

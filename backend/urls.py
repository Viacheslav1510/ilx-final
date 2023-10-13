"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from account.api.views import (
    ProfileDetailView,
    ProfileListView,
    ProfileUpdateView,
)
from wishlist.views import (
    WishListApiView,
    UserWishListItems,
    remove_from_list
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
    path('api/', include('product.urls')),
    path(
        'api/profiles/',
        ProfileListView.as_view(),
        name='profiles'
    ),
    path(
        'api/profiles/<int:user>/',
        ProfileDetailView.as_view(),
        name='profile-detail'
    ),
    path(
        'api/profiles/<int:user>/update/',
        ProfileUpdateView.as_view(),
        name='profile-update'
    ),
    path(
        'api/wishlist/',
        WishListApiView.as_view()
    ),
    path(
        'api/user/<int:pk>/wishlist-items/',
        UserWishListItems.as_view()
    ),
    path('api/remove-wishlist/', remove_from_list, name='remove-wishlist')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
from django.urls import path
from wishlist.views import (
    WishListApiView,)
# WishListCreateView)


urlpatterns = [
    path('wishlist/', WishListApiView.as_view()),
]

from flask import Blueprint

main = Blueprint('main', __name__)  #two arguments, the blueprint name and module(package) where the blurprint is located


from .import views, errors
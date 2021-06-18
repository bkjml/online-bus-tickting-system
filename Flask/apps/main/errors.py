from flask import render_template
from .import main

@main.app_errorhandler(404)  #if error handlers used instead app_errorhandler the instnace is available only for errors originate in blueprint
def page_not_found(e):
    return render_template(''), 404

@main.app_errorhandler(500)
def internal_server_error(e):
    return render_template(''), 500
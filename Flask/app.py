from flask_migrate import Migrate
from apps import create_app, db
from apps.models import User


app = create_app('default')
migrate = Migrate(app, db)



if __name__=='__main__':
    app.run()



# Manifesto

This is a personal project aimed at creating a simple webapp to manage a to-do list using React for the frontend and Django for the backend. It will also store same personal notes starting from the setup of the environments. 

# 1. Setup Backend
- install pipenv `pip3 install pipenv`. pipenv will create a virtual environment which will basically generate a deterministic build everytime (i.e the same version for every 3rd party library and sub-library without having to worry of compatibility problems in the requirements.txt file and stuff. It uses virtualenv and pip under the hood).
- `pipenv shell` to activate a new virtualenv
- `pipenv install django`
- `django-admin startproject backend` creates a new project inside backend director
- `cd backend` and `python3 manage.py startapp todomanager` creates a new app called todomanager.
- `python3 manage.py migrate` since it's the first time we run the app, we start a migration, i.e django propagates changes to the models to the schema in the db
- `python3 manage.py runserver` check if the server is running at localhost:8000

## 1.2 Add todomanager app
 go to `/backend/settings.py` and add `todomanager` into `INSTALLED_APPS`

## 1.3 Add a todo model
go to `todomanager/models.py` and create `class ToDo(models.Model)` and specify the attributes and methods.
At this point, we need to create a new migration and then apply it (specify the app name):
- `python3 manage.py makemigrations todomanager`
- `python3 manage.py migrate todomanager`

## 1.4 Test CRUD operations
- go to `todomanager/admin.py` import ToDo, and then define a new model and register it.
- create a superuser `python3 manage.py createsuperuser` (admin,admin@admin.com,admin)
- run the server and go to /admin endpoint.

# 2. Setup APIs
- `pipenv install djangorestframework django-cors-headers`
- add corsheaders and restframework to the INSTALLED_APPS. Also add cors.middleware.Middleware to MIDDLEWARE.
- add `CORS_ORIGIN_WHITELIST = [<React port>]` in `settings.py`.

## 2.1 Serializers
We need a serializers to serialize as Json the ToDo model in order to be used by the frontend.
Create `serializers.py` inside todomanager and have a look.
## 2.2 Views
We need also to create a view. Have a look at `views.py`
## 2.3 Urls
We need to set up the urls now, in `backend/urls.py`

# 3. Frontend
- into `full-stack-demo`, `npx create-react-app frontend`
- `cd frontend`, `npm start`
- `npm install react-bootstrap@next bootstrap@5.1.0` to install react-bootstrap and vanilla bootstrap
- add bootstrap to index.js `import 'bootstrap/dist/css/bootstrap.css';`

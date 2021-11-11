## General Assembly Project 4 - Hospitality Hub App

**Project Overview**

For the third Project on our Software Engineering Immersive Course at General Assembly, we were tasked with building a Full Stack Application using Python and Django for our backend and revisiting React and Express on the front end.

We used Slack, Zoom and source control with Git/Github coupled with daily stand-up and Trello to organise and complete work in a collaborative environment.

**Time Frame**

10 Days

**Team Members**

 - Gary Smith 
 - Cosmas Cieplak-Mayr von Baldegg 
 - William Alvarez

#### Project Brief

-   **Build a full-stack application**  by making your own backend and your own front-end
-   **Use an Express API**  to serve your data from a Django database
-   **Consume your API with a separate front-end**  built with React
-   **Be a complete product**  build multiple relationships.




For this project we wanted to use our shared experience in the hospitality sector to create an application that would allow:

**Employees** 

 - Should be able to register.
 - Should be able to login. 
 - Should be able to update their profile.
 - Should be able to search businesses/fellow employees and job posts.
 - Should be able to apply for jobs they like.
 - Should be able to rate their current and previous employers but not businesses they have never worked for.

**Businesses**

 - Should be able to register.
 - Should be able to login.
 - Should be able to change their business profile.
 - Should be able to search employees.
 - Should be able to Create jobs and post them for employees to accept.
 - Should be able to accept employees who have applied to work at the business.
 - Should be able to rate their current and previous employees but not employees that have never worked for them.

We wanted this to be an app for both businesses and employees to use and to allow ratings so that employees knew what sort of hospitality job they might be applying for. On the other hand employees had also been rated by previous employers and so it is an independent reflection on their work and allows Businesses to see independent ratings on potential recruits.

## Technologies Used

-   HTML5
-   CSS3/ SASS
-   Bootstrap
-   JavaScript (ES6)
- Python
-   React
-   Django
- PostgreSQL
- TablePlus
-   Express
-   Insomnia
-    Axios
-   Heroku/Netlify for deployment
-   Trello
-   Git
-   GitHub
-   Google Chrome dev tools
-   Google Sheets
-   VS Code
-   Eslint
-  Excalidraw - wireframing

## Deployment
<insert link>

Getting Started

```
<!-- To install all the packages in the frontend directory: -->
$ yarn
$ yarn add bootstrap
$ yarn start ---localhost 3000

<!-- To install all the packages in the root directory: -->
<!-- Install Django and a shell in the root directory -->
$ pipenv install django
$ pipenv shell
$ pip install pipenv

<!-- Create the postgreSQL database -->
$ pipenv install psycopg2-binary  
$ createdb hhub-app

<!-- Migrate everything from the backend -->
$ python manage.py makemigration
$ python manage.py migrate

<!-- Seed your database by running the following command -->
$ python manage.py loaddata jwt_auth/seeds.json 
$ python manage.py loaddata Businessprofile/seeds.json 
$ python manage.py loaddata Userprofile/seeds.json 
$ python manage.py loaddata Jobrole/seeds.json 
$ python manage.py loaddata Jobpost/seeds.json 
$ python manage.py loaddata Empreview/seeds.json 
$ python manage.py loaddata Busrating/seeds.json 

<!-- To run the project on localhost:8000 type: -->
$ python manage.py runserver
```

![<insert main site image>](https://github.com/miskhill/Project4/blob/main/readmeproject4/jobpost.png)

## Approach

We spent time planning our different relationships in the back-end as to whether they would be many-to-many, one-to-many or one-to-one. 

We used Excalidraw to wireframe this out as a visual indicator. Additionally we had 26 React components to consider and how we wanted these to interact with each other throughout the site. Additionally we used Trello to organise our components between each other and allow us to work independently. We did find though that we were on Zoom throughout and it made it easy to quickly catch up and keep on track.

![Wireframe](https://github.com/miskhill/Project4/blob/main/readmeproject4/wireframe.png)


## Back-End

We wanted to have a secure authorised log-in system and registration to the site and used JWTAutentication in Django to achieve this. We liked the Django backend system for this compared to MongoDB as it allowed us easy access rights and a great admin section. This saved us time and was helpful.

![Auth code](https://github.com/miskhill/Project4/blob/main/readmeproject4/authentication.png)

We had multiple models to consider throughout the project and made use of ForeignKey, ManyToMany, ImageField among others.

![Modelspyrelationship](https://github.com/miskhill/Project4/blob/main/readmeproject4/modelspyrelationships.png)

We had some trouble hosting images for our database and with our models the URL was not displaying correctly. Cosmas used a slice method to get the information we needed to display these images. Although not ideal it was great to use JavaScript knowledge to make this happen.

![Database manipulation](https://github.com/miskhill/Project4/blob/main/readmeproject4/manipulatingdatabaseimage.png)

## Front-End

Login/Register:
We needed to add authentication to allow business or employee users to login and sign up. This allowed the relationships to be independent so businesses could not rate employees who had not worked for them or employees to rate businesses they hadn't actually worked.

![login](https://github.com/miskhill/Project4/blob/main/readmeproject4/login.png)

It was important that we had a list of all available employees and businesses. We felt this would be important to do visual searches.

![<insert All employees>](https://github.com/miskhill/Project4/blob/main/readmeproject4/AllEmployees.png)

We wanted to implement search functionality as well so employee users could use a drop down/search bar or browse all jobs/locations.

![<insert jobsearchfunction screenshot>](https://github.com/miskhill/Project4/blob/main/readmeproject4/Jobsearchfunction.png)

Once the employee user sees a job they want they should also be able to apply to that post which will allow the business to see their profile and rating. From there they decide whether they want to hire the applicant. If they choose to hire they hit the accept button and their relationship is built.

![<insert jobsearchapply screenshot >](https://github.com/miskhill/Project4/blob/main/readmeproject4/jobsearchapply.png)


## Challenges

 - We hoped we could avoid using a 3rd party service like Cloudinary to host images for our back end but in the end we realised this was going to be necessary as React would not display the URLS from the source media files in the project from our Back-End. We used Imgur to quickly achieve this but our URLs were being affected by the ImageField changing the URL path. We used a slice method on the Front-End to achieve what we wanted here.
 - We implemented Google login but we ultimately removed this functionality. Although it worked we found some errors after a first login that we did not have enough time to iron out before the deadline. 

## Wins

-   Source control was much smoother this time around and we were able to work through problems together should we encounter any. 
-   Teamwork - We had set ourselves a complicated application to achieve in 10 days considering we were relatively new to Django. We pulled together to complete this in the timeframe set including an overnight! 
- The Django admin feature was great saving us a lot of time in terms of user admin rights. Compared to MongoDB this was a good time save.
- I implemented a 3rd party API to generate random user profiles for us. We ultimately removed this feature and used the data we needed to seed our own database but it was pleasing to get this up and running and saved us a lot of time.
- I enjoyed working with Python on the back-end. It was intuitive and although I was writing commands as oppose to JS functions it was still good to see this was natural rather than a struggle.
- Good use of Insomnia! Even managed to share data so we didn't all have to make requests.

![Insomnia](https://github.com/miskhill/Project4/blob/main/readmeproject4/Screenshot%202021-10-26%20at%2010.37.25.png)

## Future Improvements

-   More structure to the Map functionality with sizing uniform in CSS
-   Add responsive design for mobiles.
-  We wanted the rating to be relative to the user. If you had a bad rating or always rated low this would be taken into consideration with the weighting. 
- Google/Facebook login for users.
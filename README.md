This is the source code of the generated [GalenFramework.com](http://galenframework.com) website. It is powered by (Blogix)[http://blogix.info] which is a static website generator with embeded webserver.
If you would like to contribute to Galen Framework documentation like adding information or fixing errors please follow the steps below:

1. Get blogix and configure it. This is described in [Blogix Documentation](http://blogix.info/docs/all/)
2. Make a change. All the source pages for documentation are located in **db/docs/** folder and have the **.blogix** file type
3. Run ```blogix run``` command within root folder of the project and it will launch the local webserver so you can test your changes via http://localhost:8080.
4. Send a pull request. I will review it and make an update on a live site.
5. Thank you!

P.S. At the moment the blogix is not really supported so if it doesn't work for you just send your changes as is. I can't spend time on so many projects so I decided not to maintain blogix as it just works for me (with few minor bugs). But if you do manage to set it up please note that during local testing all the urls should end with slash (/). e.g. ```http://localhost:8080/docs/all/```. If you remove the last slash it will give you an exception.

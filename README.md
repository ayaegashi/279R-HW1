# 279R-HW1

You can access my to do app here: https://stark-dawn-00780.herokuapp.com/

## Reflection 
### What are the significant software concepts that this combination of technologies has that plain HTML, CSS, and JS does not? Or that they handle significantly differently?

One significant difference between using a combination of NodeJS and MongoDB vs. working with pure HTML, CSS, and JS is that the web app is able to interact with data stored on the cloud and therefore accessible from any machine. With the to-do list app I built last week, every time I reloaded the webpage my to-do list was erased and went back to the default inputs. One way to be able to save my to-do list data would have been to save the to-do tasks to a text file on my local machine. However, another user on another machine wouldn’t be able to interact with my data in my text file at the same time. The process of sharing, editing, and interacting with the same data from different machines is much easier when accessing cloud data, such as with MongoDB.

Another difference I noticed was being able to embed Javascript directly into the HTML using .ejs files. While it is still possible to make a webpage dynamic using pure HTML files (as demonstrated last week), I felt that the use of .ejs files gets closer to the merging of HTML and Javascript that we see in other frameworks such as React. I found that merging the two languages and therefore uniting the static (visual) and dynamic (process) elements of the web app was conceptually easier to work with, because you can more directly attach functionality to the different visual components on the screen.


## Sources:

Tutorial: https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583

https://stackoverflow.com/questions/27599614/var-express-requireexpress-var-app-express-what-is-express-is-it


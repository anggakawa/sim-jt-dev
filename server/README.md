# SERVER PAGE

## What you need to prepare
1. Mysql database.
2. Import the data. 
3. You can run the migration. (on progress)
4. Remember to create procedures if you use the migration.

### database rules. 
1. there are some initial row in activity: 
* first row in activity is "initial order" with the id = 1.
* second row is the first activity after you insert the order. (please remember this row gonna be our initial value in activity_tracker).
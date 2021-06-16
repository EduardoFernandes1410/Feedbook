DB_FILE="data/feedbook_db.sql"
CREATE_USER_FILE="data/create_admin.sql"

# if ! [ -f "$CREATE_USER_FILE" ]; then
#     gpg -d "$CREATE_USER_FILE.gpg"
# fi

mysql -u root -p < $DB_FILE < $CREATE_USER_FILE && echo "DataBase Configured." 

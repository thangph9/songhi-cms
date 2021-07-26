# docker run --name songhi-postgres -p 5432:5432  -e POSTGRES_PASSWORD=songhi@123 -d postgres
# docker build --tag songhi-cms .
# docker run --publish 8080:8080 songhi-cms
# psql -U songhi -h localhost -W -d songhi -1 -f songhi-20210716-035854.sql
# docker run --name songhi-postgres -p 5432:5432 -itd --network=host -e POSTGRES_PASSWORD=songhi@123 -d postgres
# docker run --name songhi-cms -itd -p 3000:3000 --network=host -d songhi-blog

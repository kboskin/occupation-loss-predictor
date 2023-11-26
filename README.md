## Local environment setup

### Requirements
 * Install Docker

### Init
 * Run `docker-compose up` and make sure that DB and spock are up and running
 * If DB fails to start up before Spock starts, you can also run `docker-compose up -d db` and after approx 20 seconds
`docker-compose up -d <command>`. Also, please report this to @rv.oleg

### Pull
To get the latest images run:
 ```sh
docker-compose down && docker-compose pull && docker-compose up -d
```

To run a version build for a specific commit, pass it as TAG env variable:
```sh
export TAG=04ce25fa
docker-compose down && docker-compose pull && docker-compose up -d
```

To switch back to main:
```sh
export TAG=main
docker-compose down && docker-compose pull && docker-compose up -d
```
# Data management

## Manual data sync

It's possible to sync data on production manually if needed. To do that, go to the

http://ec2-44-210-7-238.compute-1.amazonaws.com:8000/docs#/admin/migrate_api_admin_sync_post

API key is: **9Ns&ND&9Saie@uwAaVTe?WTw)**

## Filters

It's possible to have both Y/N filters and enum filters (multiple values). If filter is enum, it's name is it's value. "N" value in this case is ignored

### Filters excluding options

If filter is not applicable - it should have "None" value in the column

### Filters delete

It's possible but since users are making bookmarks - they will lost deleted filters on the next data sync (id will mismatch on db upgrade)

### Filters linking in other tables

Filters are looked up by column name or column value. In perfect world, values across the table should be unique, so that there are no dups on the frontend, since filter value is used to present to user

### Filters-to-icons

Match occurs by filter name-filter value. If filter has been renamed - icon file should be renamed on the server and whole backend should be redeployed

## Filter Subcategories

Used to group filters under specific name. Type can be either **"Single Select Button"** or **"Dropdown"**. That will control filter look on the main page 

To reference specific filter - it's name can be used. Alternatively - it can be a value. If it's a Y/N filter - name should be used

## Onboarding Quiz questions

Controlling onboarding look

### Unique functionality
**"Experience Level"** filter can be used in the unique way for this table using "FilterName: FilterValue" syntax. Values should be in numeric format (same as they live in root table)

Other filters are working in the same manner. If full filter should be applied - should be used filter name (precisely). If only value - only value. Y/N filters should be referenced by name always

## Pre-set filters
Presets are displayed on the main page. Rules are the same: If full filter should be applied - should be used filter name (precisely). If only value - only value. Y/N filters should be referenced by name always. Filter name is responsible for representation of preset for user


## Platforms (notice)

Platforms have some filtering rules to avoid bad data in the db. Platform has mandatory fields:
```
    name: str
    description: str
    website: str
```
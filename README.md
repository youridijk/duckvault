# DuckVault
The app needed by every Disney Comics fan. Powered by the Inducks database, 
this app allows you to keep track of your private collection of Disney Comics.
Simply search for an issue title, publication name, publication category, 
or anything else and view all information about an issue and add to your private collection.

you can see the app in action in [this demo video](https://duckvault.dijk.cc/downloads/demo.mp4).

<video width="196" height="426" controls>
  <source src="https://duckvault.dijk.cc/downloads/demo.mp4" type="video/mp4">
</video>

## Status
This app is still heavily work in progress, but the following features are stable:
- Search engine: Search issues based on:
  - Issue title
  - Issue number
  - Issue publishing date
  - Country
  - Language code (e.g nl, en, de, fr, etc.)
  - Country code (e.g nl, us, be, etc.)
  - Publication name
  - Publication category (e.g. newspaper)
- View information about an issue:
  - Issue title
  - Issue publication
  - Issue publishing date
  - The stories that appear in the issue
  - Equivalent issues of an issue
- Add issues to your private collection
- View your private collection as a list or grid
- Language support for English and Dutch

## TODO
Some of the features that are planned to be added: 
- Weekly update the database and search engine
- Add more screens to view information about:
  - Characters
  - Stories
  - Publications
- Add more ability to search for the following items:
  - Characters
  - Stories
  - Publications
  - Users
- Add functionality to make your account private (only you can see your private collection then)
- Add support for more languages
- Add import from and export for your private collection to Inducks 
- Add the ability to add other users as friend
- Add statics to your account
- Add working wishlist
- Add working favorites list
- Add working custom lists

## Getting it up and running
### Installation
Install JavaScript dependencies with Yarn:
```shell
yarn
```

Install iOS pods:
```shell 
yarn pod:install
```

### Run in development mode
Start Watchman:
```shell
yarn start
```

Run the app in development mode on iOS:
```shell
yarn ios
```

Run the app in development mode on Android:
```shell
yarn android
```

### Release
To run the app in release mode on iOS:
```shell
yarn ios:release
```

or without running the `pod:install`

```shell
yarn ios --mode=Release
```

To create an APK file:
```shell
cd android && ./gradlew
```

## Contributing
If you want to help building this app, feel free to open up an issue or PR. 
Don't have technical skills? You can still help by translating the app in more languages. 
If you want to help translating, open up an issue and I will set things up. 

## Inducks
All data from this app is from [Inducks](https://inducks.org). This app is a non-official app version of the Inducks website. 


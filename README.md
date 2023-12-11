# GoPeer Instant Tutoring Button

This is a simple script to add a GoPeer instant tutoring button on your website. The button, when clicked, will open a new window and take the user to the GoPeer instant tutoring platform.

# Importing The Script

To use this script on your website, add this to the index.html file

```
  <script src="https://js.gopeer.org/loader.js" async></script>
```

# Using The Script

In order to use this script, you will need to generate a token.The token can be generated from these endpoints:

- `POST` https://next.gopeer.org/organizations/identify (production token)
- `POST` https://dev.gopeer.org/organizations/identify (development token)

These routes need two parameters -> `key` and `orgId`, both of them should be provided inside the request's body. Both these values for your organization can be acquired by contacting GoPeer's representative.

- `key` - randomly generated string (GoPeer stores hashed version of this string)
- `orgId` - ObjectId for the organization.

If all required body fields are present and the key is correct, these endpoints will return status code 200 with an object as a response body.The Object will contain a single field `token`.

- code: 200
- body: { `token`: String }


> :warning: **Token Expires in 30 days,** make sure to renew token once in a month

> :warning: **After generating the development token, set development evn with calling `gp.setEnv("dev")`**

# API

- `gP.identify(userData)`

  - Sets the user data object.
  - providedUserData (Object): The user data to be set.
  - required fields: userId, lastName, firstName
  - you can also pass `token` field in this object and you won't need to call `setToken` separately
  - following is the interface for all the expected fields:

    ```
    {
      districtId: string    // [A-Za-z0-9]
      schoolId: string      // [A-Za-z0-9]
      courseId: string      // [A-Za-z0-9]
      schoolName: string    // [A-Za-z0-9- ()%&]
      courseName: string    // [A-Za-z0-9- ()%&]

      lessonName: string    // [A-Za-z0-9- ]
      activityName: string  // [A-Za-z0-9- ]

      userId: string      // [A-Za-z0-9]
      name: string
      email: string
      subject: string     // [a-z_]
      grade: string     // elementary | middle | high | [0-9]

      links: {title:string, url:string, text:string}[]
    }
    ```

    The `userId` and `name` fields are required, while rest of the fields are optional.

- `gP.setToken(token)`

  - Sets the token in the user data object.
  - token (string): The token generated after making request to the gopeer-api with organization specific secret (Contact GoPeer representative to get the secret ).

- `gP.launch()`

  - launches GoPeer platform in a new tab. This is usefull when a custom launch button is used.

- `gP.show()`

  - Displays the user interface element if the user data object and organization Id is provided.

- `gP.hide()`

  - Hides the user interface element.

- `gP.setPosition(position)`

  - Sets the position of the user interface element.
  - coordinates (Object): An object containing the bottom and right properties with pixel values.

- `gP.setButtonStyles(styles)`

  - Applies a set of styles to the button element.
  - styles (Object): An object containing CSS property-value pairs.

- `gP.setTextStyles(styles)`

  - Applies a set of styles to the button's text element.
  - styles (Object): An object containing CSS property-value pairs.

- `gP.setTheme(theme)`

  - Sets the theme for the user interface element.
  - theme (String): The theme to be applied. Accepts "dark" or "light".

  - `gP.setLinks(links)`

  - Sets provided links in the user data object.
  - params: `{text: string, url: string, title:string}[]`

- `gP.setEnv(env)`
  - Sets the environment variable.
  - env (String): The environment variable value.
  - Default value is "prod".
  - Make sure token's env is the same as provided env.

# Example

```
  useEffect(() => {
    const gP = window.gP;
    // setup env
    gP.setEnv("dev");
    const token = "<token>"; //token loaded from server after making request to gopeer-api
    gP.setToken(token);

    // auth user

    gP.identify({
      userId: "<user-id>",
      firstName: "John",
      lastName: "Doe",
    });

    // show and position widget
    gP.show();
    gP.setButtonStyles({ bottom: "50px", right: "calc(50% - 85px)" });

    //setLinks
    const links = [{title: "Course", url:"https://course.linl", text: "Algebra 101}]
    gp.setLinks(links)

    // redirecting to GoPeer after 10 seconds without waiting for button click
    setTimeout(() => {
      gP.launch()
    }, 10 * 1000)
  }, []);
```

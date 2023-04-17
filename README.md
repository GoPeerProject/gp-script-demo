# GoPeer Instant Tutoring Button

This is a simple script to add a GoPeer instant tutoring button on your website. The button, when clicked, will open a new window and take the user to the GoPeer instant tutoring platform.

# Importing Script

To use this script on your website, add this to the index.html file

```
  <script src="https://js.gopeer.org/loader.js" async></script>
```

# API

- `gP.identify(userData)`
  - Sets the user data object.
  - providedUserData (Object): The user data to be set.
  - required fields: userId, lastName, firstName, organizationId

- `gP.setOrg(organizationId)`
  - Sets the organization ID in the user data object.
  - organizationId (string): The organization ID provided by GoPeer.

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

- `gP.setEnv(env)`
  - Sets the environment variable.
  - env (String): The environment variable value.
  - Default value is "prod".

# Example

```
  useEffect(() => {
    const gP = window.gP;
    gP.setEnv("dev");
    gP.identify({
      userId: <user-id>,
      firstName: "John",
      lastName: "Doe",
      organizationId: <organization-id>,
    });
    gP.show();

    gP.setButtonStyles({ bottom: "50px", right: "50px" });
  }, []);
```

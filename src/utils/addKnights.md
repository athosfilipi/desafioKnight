## Add knight

``` bash
# route:
# method: post
► http://{{BASE_URL}}/knights/
```

``` bash
# body exemple:
{
  "name": "Arthur Pendragon",
  "nickname": "The Once and Future King",
  "birthday": "02/09/476",
  "weapons": [],
  "attributes": {
    "strength": 18,
    "dexterity": 14,
    "constitution": 16,
    "intelligence": 12,
    "wisdom": 10,
    "charisma": 20
  },
  "keyAttribute": "Charisma"
}
```
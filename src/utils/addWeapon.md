## Add weapon

``` bash
# route:
# method: post
► http://{{BASE_URL}}/knights/addWeapon/{{knightID}}
```

``` bash
# body exemple:
{
    "weapon": {
        "name": "table",
        "mod": 5,
        "attr": "fisic",
        "equipped": "true"
    }
}
```
# Markdown Syntax

## Header 1

### Header2

#### Header3

* foo
* bar
* baz

1. hoge
2. fuga
3. piyo

* [ ] onion
* [x] tomato
* [ ] potato

{% hint style="info" %}
info hint

several lines are allowed.

* foo
* bar
* baz
{% endhint %}

{% hint style="warning" %}
warning hint
{% endhint %}

{% hint style="danger" %}
danger hint
{% endhint %}

{% hint style="success" %}
success hint
{% endhint %}

> quota

```
// Some code
my code blocks
```

{% file src="../markdown-syntax/assets/hello.txt" %}
:thumbsup:
{% endfile %}

![this is img captions.](../markdown-syntax/assets/photo.jpeg)

{% embed url="https://www.youtube.com/watch?v=DCkmCWi6was" %}

{% embed url="https://www.instagram.com/p/CZDt1hFp7xC" %}

<table><thead><tr><th>foo</th><th>bar</th><th data-type="number">baz</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>2</td></tr><tr><td>foo</td><td>bar</td><td>12345</td></tr></tbody></table>

{% tabs %}
{% tab title="First Tab" %}
first tab contents
{% endtab %}

{% tab title="Second Tab" %}
second tab contents
{% endtab %}
{% endtabs %}

<details>

<summary>expand title</summary>

this is expanded content

</details>

$$
f(x) = x * e^{2 pi i \xi x}
$$

{% swagger method="get" path="" baseUrl="artifactory" summary="Get Users" %}
{% swagger-description %}
descriptions
{% endswagger-description %}

{% swagger-parameter in="path" name="user" required="false" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="id" required="false" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="OK" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% content-ref url="../markdown-syntax/page-2/" %}
[page-2](../markdown-syntax/page-2/)
{% endcontent-ref %}

{% embed url="https://docs.google.com/spreadsheets/d/1S-K6DI1E8WNUKTkahDflnsVrTa0_pkcT1jtq3Zdtw9Q/edit#gid=0" %}

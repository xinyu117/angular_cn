# Component styles

# 组件样式

Angular applications are styled with standard CSS. That means you can apply
everything you know about CSS stylesheets, selectors, rules, and media queries
directly to Angular applications.

Angular 应用使用标准的 CSS 来设置样式。这意味着你可以把关于 CSS
的那些知识和技能直接用于 Angular 程序中，例如：样式表、选择器、规则以及媒体查询等。

Additionally, Angular can bundle *component styles*
with components, enabling a more modular design than regular stylesheets.

另外，Angular 还能把*组件样式*捆绑在组件上，以实现比标准样式表更加模块化的设计。

This page describes how to load and apply these component styles.

本章将会讲解如何加载和使用这些*组件样式*。

Run the <live-example></live-example> in Stackblitz and download the code from there.

可以运行<live-example></live-example>，在 Stackblitz 中试用并下载本页的代码。

## Using component styles

## 使用组件样式

For every Angular component you write, you can define not only an HTML template,
but also the CSS styles that go with that template,
specifying any selectors, rules, and media queries that you need.

对你编写的每个 Angular 组件来说，除了定义 HTML 模板之外，还要定义用于模板的 CSS 样式、
指定任意的选择器、规则和媒体查询。

One way to do this is to set the `styles` property in the component metadata.
The `styles` property takes an array of strings that contain CSS code.
Usually you give it one string, as in the following example:

实现方式之一，是在组件的元数据中设置 `styles` 属性。
`styles` 属性可以接受一个包含 CSS 代码的字符串数组。
通常你只给它一个字符串就行了，如同下例：

<code-example path="component-styles/src/app/hero-app.component.ts" header="src/app/hero-app.component.ts"></code-example>

## Style scope

## 范围化的样式

<div class="alert is-critical">

The styles specified in `@Component` metadata _apply only within the template of that component_.

在 `@Component` 的元数据中指定的样式只会对该组件的模板生效。

</div>

They are _not inherited_ by any components nested within the template nor by any content projected into the component.

它们既不会被模板中嵌入的组件继承，也不会被通过内容投影（如 ng-content）嵌进来的组件继承。

In this example, the `h1` style applies only to the `HeroAppComponent`,
not to the nested `HeroMainComponent` nor to `<h1>` tags anywhere else in the application.

在这个例子中，`h1` 的样式只对 `HeroAppComponent` 生效，既不会作用于内嵌的 `HeroMainComponent`，也不会作用于应用中其它任何地方的 `<h1>` 标签。

This scoping restriction is a ***styling modularity feature***.

这种范围限制就是所谓的***样式模块化***特性

* Use the CSS class names and selectors that make the most sense in the context of each component.

   可以使用对每个组件最有意义的 CSS 类名和选择器。

* Class names and selectors are local to the component and don't collide with
  classes and selectors used elsewhere in the application.

   类名和选择器是局限于该组件的，它不会和应用中其它地方的类名和选择器冲突。

* Changes to styles elsewhere in the application don't affect the component's styles.

   组件的样式*不会*因为别的地方修改了样式而被意外改变。

* Co-locate the CSS code of each component with the TypeScript and HTML code of the component,
  which leads to a neat and tidy project structure.

   可以让每个组件的 CSS 代码和它的 TypeScript、HTML 代码放在一起，这将促成清爽整洁的项目结构。

* Change or remove component CSS code without searching through the
  whole application to find where else the code is used.

   以后还可以修改或移除组件的 CSS 代码，而不用遍历整个应用来看它有没有在别处用到。

{@a special-selectors}

## Special selectors

## 特殊的选择器

Component styles have a few special *selectors* from the world of shadow DOM style scoping
(described in the [CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1) page on the
[W3C](https://www.w3.org) site).
The following sections describe these selectors.

组件样式中有一些从影子(Shadow) DOM 样式范围领域（记录在[W3C](https://www.w3.org)的[CSS Scoping Module Level 1](https://www.w3.org/TR/css-scoping-1)中） 引入的特殊*选择器*：

### :host

Every component is associated within an element that matches the component's selector. This element, into which the template is rendered, 
is called the _host element_.
The `:host` pseudo-class selector may be used to create styles that target the host element itself, as opposed to targeting elements inside the host.

每个组件都会关联一个与其组件选择器相匹配的元素。这个元素称为*宿主元素*，模板会渲染到其中。`:host` 伪类选择器可用于创建针对宿主元素自身的样式，而不是针对宿主内部的那些元素。

<code-example path="component-styles/src/app/host-selector-example.component.ts" header="src/app/host-selector-example.component.ts">
</code-example>

Creating the following style will target the component's host element. Any rule applied to this selector will affect the host element and all its descendants (in this case, italicizing all contained text).

下面的样式将以组件的宿主元素为目标。应用于此选择器的任何规则都将影响宿主元素及其所有后代（在这种情况下，将所有包含的文本斜体）。（译注：后代的样式源自 CSS 的样式继承特性）

<code-example path="component-styles/src/app/hero-details.component.css" region="host" header="src/app/hero-details.component.css"></code-example>

The `:host` selector only targets the host element of a component. Any styles within the `:host` block of a child component will *not* affect parent components.

`:host` 选择是是把宿主元素作为目标的*唯一*方式。除此之外，你将没办法指定它，
因为宿主不是组件自身模板的一部分，而是父组件模板的一部分。

Use the *function form* to apply host styles conditionally by
including another selector inside parentheses after `:host`.

要把宿主样式作为条件，就要像*函数*一样把其它选择器放在 `:host` 后面的括号中。

In this example the host's content also becomes bold when the `active` CSS class is applied to the host element.

在这个例子中，当 CSS 类 `active` 应用在宿主元素上时，宿主元素的内容也变成了粗体。

<code-example path="component-styles/src/app/hero-details.component.css" region="hostfunction" header="src/app/hero-details.component.css"></code-example>

The `:host` selector can also be combined with other selectors.
Add selectors behind the `:host` to select child elements, for example using `:host h2` to target all `<h2>` elements inside a component's view.

`:host` 选择器也可以与其他选择器组合使用。在 `:host` 后面添加选择器以选择子元素，例如，使用 `:host h2` 定位组件视图内的 `<h2>`。

<div class="alert is-helpful">

You should not add selectors (other than `:host-context`) in front of the `:host` selector to style a component based on the outer context of the component's view. Such selectors are not scoped to a component's view and will select the outer context, but it's not built-in behavior. Use `:host-context` selector for that purpose instead.

不应该在 `:host` 选择器前面添加除 `:host-context` 之外的选择器来试图基于组件视图的外部上下文为本组件设置样式。因为此类选择器的作用域不会限于组件的视图，而是会选择外部上下文，但这不是内置的行为。请改用 `:host-context` 选择器。

</div>

### :host-context

Sometimes it's useful to apply styles to elements within a component's template 
based on some condition in an element that is an ancestor of the host element.
For example, a CSS theme class could be applied to the document `<body>` element, and
you want to change how your component looks based on that.

有时候，需要以某些来自宿主的祖先元素为条件来决定是否要应用某些样式。
例如，在文档的 `<body>` 元素上可能有一个用于表示样式主题 (theme) 的 CSS 类，你应当基于它来决定组件的样式。

Use the `:host-context()` pseudo-class selector, which works just like the function
form of `:host()`. The `:host-context()` selector looks for a CSS class in any ancestor of the component host element,
up to the document root. The `:host-context()` selector is only useful when combined with another selector.

这时可以使用 `:host-context()` 伪类选择器。它也以类似 `:host()` 形式使用。它在当前组件宿主元素的*祖先节点*中查找 CSS 类，
直到文档的根节点为止。它只能与其它选择器组合使用。

The following example italicizes all text inside a component, but only
if some _ancestor_ element of the host element has the CSS class `active`.

在下面的例子中，只有当该组件的某个祖先元素有 CSS 类 `active` 时，才会把该组件*内部*的所有文本置为斜体。

<code-example path="component-styles/src/app/hero-details.component.css" region="hostcontext" header="src/app/hero-details.component.css"></code-example>

Note that only the host element and its descendants will be affected, not the ancestor with the assigned `active` class.

注意，只有宿主元素及其各级子节点会受到影响，不包括加上 `active` 类的这个节点的祖先。

### (deprecated) `/deep/`, `>>>`, and `::ng-deep`

### 已弃用 `/deep/`、`>>>` 和 `::ng-deep`

Component styles normally apply only to the HTML in the component's own template.

组件样式通常只会作用于组件自身的 HTML 上。

Applying the `::ng-deep` pseudo-class to any CSS rule completely disables view-encapsulation for
that rule. Any style with `::ng-deep` applied becomes a global style. In order to scope the specified style
to the current component and all its descendants, be sure to include the `:host` selector before
`::ng-deep`. If the `::ng-deep` combinator is used without the `:host` pseudo-class selector, the style
can bleed into other components.

把伪类 `::ng-deep` 应用到任何一条 CSS 规则上就会完全禁止对那条规则的视图包装。任何带有 `::ng-deep` 的样式都会变成全局样式。为了把指定的样式限定在当前组件及其下级组件中，请确保在 `::ng-deep` 之前带上 `:host` 选择器。如果 `::ng-deep` 组合器在 `:host` 伪类之外使用，该样式就会污染其它组件。

The following example targets all `<h3>` elements, from the host element down
through this component to all of its child elements in the DOM.

这个例子以所有的 `<h3>` 元素为目标，从宿主元素到当前元素再到 DOM 中的所有子元素：

<code-example path="component-styles/src/app/hero-details.component.css" region="deep" header="src/app/hero-details.component.css"></code-example>

The `/deep/` combinator also has the aliases `>>>`, and `::ng-deep`.

`/deep/` 组合器还有两个别名：`>>>` 和 `::ng-deep`。

<div class="alert is-important">

Use `/deep/`, `>>>` and `::ng-deep` only with *emulated* view encapsulation.
Emulated is the default and most commonly used view encapsulation. For more information, see the
[View Encapsulation](guide/view-encapsulation) section.

`/deep/` 和 `>>>` 选择器只能被用在**仿真 (emulated) **模式下。
这种方式是默认值，也是用得最多的方式。
更多信息，见[控制视图封装模式](guide/view-encapsulation)一节。

</div>

<div class="alert is-important">

The shadow-piercing descendant combinator is deprecated and [support is being removed from major browsers](https://www.chromestatus.com/feature/6750456638341120) and tools.
As such we plan to drop support in Angular (for all 3 of `/deep/`, `>>>` and `::ng-deep`).
Until then `::ng-deep` should be preferred for a broader compatibility with the tools.

CSS 标准中用于 "刺穿 Shadow DOM" 的组合器已经被弃用，并将[这个特性从主流浏览器和工具中移除](https://www.chromestatus.com/features/6750456638341120)。
因此，我们也将在 Angular 中移除对它们的支持（包括 `/deep/`、`>>>` 和 `::ng-deep`）。
目前，建议先统一使用 `::ng-deep`，以便兼容将来的工具。

</div>

{@a loading-styles}

## Loading component styles

## 把样式加载进组件中

There are several ways to add styles to a component:

有几种方式把样式加入组件：

* By setting `styles` or `styleUrls` metadata.

   设置 `styles` 或 `styleUrls` 元数据

* Inline in the template HTML.

   内联在模板的 HTML 中

* With CSS imports.

   通过 CSS 文件导入

The scoping rules outlined earlier apply to each of these loading patterns.

上述作用域规则对所有这些加载模式都适用。

### Styles in component metadata

### 元数据中的样式

Add a `styles` array property to the `@Component` decorator.

给 `@Component` 装饰器添加一个 `styles` 数组型属性。

Each string in the array defines some CSS for this component.

这个数组中的每一个字符串（通常也只有一个）定义一份 CSS。

<code-example path="component-styles/src/app/hero-app.component.ts" header="src/app/hero-app.component.ts (CSS inline)">
</code-example>

<div class="alert is-critical">

Reminder: these styles apply _only to this component_.
They are _not inherited_ by any components nested within the template nor by any content projected into the component.

注意：这些样式**只对当前组件生效**。
它们**既不会作用于模板中嵌入的任何组件**，也不会作用于投影进来的组件（如 `ng-content` ）。

</div>

The Angular CLI command [`ng generate component`](cli/generate) defines an empty `styles` array when you create the component with the `--inline-style` flag.

当使用 `--inline-styles` 标识创建组件时，Angular CLI 的 [`ng generate component`](cli/generate) 命令就会定义一个空的 `styles` 数组

<code-example language="sh">
ng generate component hero-app --inline-style
</code-example>

### Style files in component metadata

### 组件元数据中的样式文件

Load styles from external CSS files by adding a `styleUrls` property
to a component's `@Component` decorator:

把外部 CSS 文件添加到 `@Component` 的 `styleUrls` 属性中以加载外部样式。

<code-tabs>
  <code-pane header="src/app/hero-app.component.ts (CSS in file)" path="component-styles/src/app/hero-app.component.1.ts"></code-pane>
  <code-pane header="src/app/hero-app.component.css" path="component-styles/src/app/hero-app.component.css"></code-pane>
</code-tabs>

<div class="alert is-critical">

Reminder: the styles in the style file apply _only to this component_.
They are _not inherited_ by any components nested within the template nor by any content projected into the component.

注意：这些样式**只对当前组件生效**。
它们**既不会作用于模板中嵌入的任何组件**，也不会作用于投影进来的组件（如 `ng-content` ）。

</div>

<div class="alert is-helpful">

  You can specify more than one styles file or even a combination of `styles` and `styleUrls`.

  你可以指定多个样式文件，甚至可以组合使用 `style` 和 `styleUrls` 方式。

</div>

When you use the Angular CLI command [`ng generate component`](cli/generate) without the `--inline-style` flag, it creates an empty styles file for you and references that file in the component's generated `styleUrls`.

当你使用 Angular CLI 的 [`ng generate component`](cli/generate) 命令但不带 `--inline-style` 标志时，CLI 会为你创建一个空白的样式表文件，并且在所生成组件的 `styleUrls` 中引用该文件。

<code-example language="sh">
ng generate component hero-app
</code-example>

### Template inline styles

### 模板内联样式

Embed CSS styles directly into the HTML template by putting them
inside `<style>` tags.

可以直接在组件的 HTML 模板中写 `<style>` 标签来内嵌 CSS 样式。

<code-example path="component-styles/src/app/hero-controls.component.ts" region="inlinestyles" header="src/app/hero-controls.component.ts">
</code-example>

### Template link tags

### 模板中的 link 标签

You can also write `<link>` tags into the component's HTML template.

你也可以在组件的 HTML 模板中写 `<link>` 标签。

<code-example path="component-styles/src/app/hero-team.component.ts" region="stylelink" header="src/app/hero-team.component.ts">
</code-example>

<div class="alert is-critical">

When building with the CLI, be sure to include the linked style file among the assets to be copied to the server as described in the [Assets configuration guide](guide/workspace-config#assets-configuration).

当使用 CLI 进行构建时，要确保这个链接到的样式表文件被复制到了服务器上。参阅[资产文件配置指南](guide/workspace-config#assets-configuration)。

Once included, the CLI includes the stylesheet, whether the link tag's href URL is relative to the application root or the component file.

只要引用过，CLI 就会计入这个样式表，无论这个 link 标签的 href 指向的 URL 是相对于应用根目录的还是相对于组件文件的。

</div>

### CSS @imports

### CSS @imports 语法

Import CSS files into the CSS files using the standard CSS `@import` rule.
For details, see [`@import`](https://developer.mozilla.org/en/docs/Web/CSS/@import)
on the [MDN](https://developer.mozilla.org) site.

可以利用标准的 CSS [`@import` 规则](https://developer.mozilla.org/en/docs/Web/CSS/@import)来把其它
  CSS 文件导入到 CSS 文件中。

In this case, the URL is relative to the CSS file into which you're importing.

在*这种*情况下，URL 是相对于你正在导入的 CSS 文件的。

<code-example path="component-styles/src/app/hero-details.component.css" region="import" header="src/app/hero-details.component.css (excerpt)">
</code-example>

### External and global style files

### 外部以及全局样式文件

When building with the CLI, you must configure the `angular.json` to include _all external assets_, including external style files.

当使用 CLI 进行构建时，你必须配置 `angular.json` 文件，使其包含*所有外部资源*（包括外部的样式表文件）。

Register **global** style files in the `styles` section which, by default, is pre-configured with the global `styles.css` file.

在它的 `styles` 区注册这些**全局**样式文件，默认情况下，它会有一个预先配置的全局 `styles.css` 文件。

See the [Styles configuration guide](guide/workspace-config#styles-and-scripts-configuration) to learn more.

要了解更多，参阅 [样式配置指南](guide/workspace-config#styles-and-scripts-configuration)。

### Non-CSS style files

### 非 CSS 样式文件

If you're building with the CLI,
you can write style files in [sass](https://sass-lang.com/), or [less](http://lesscss.org/), and specify those files in the `@Component.styleUrls` metadata with the appropriate extensions (`.scss`, `.less`) as in the following example:

如果使用 CLI 进行构建，那么你可以用 [sass](http://sass-lang.com/) 或 [less](http://lesscss.org/) 来编写样式，并使用相应的扩展名（`.scss`、`.less`）把它们指定到 `@Component.styleUrls` 元数据中。例子如下：

<code-example>
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
...
</code-example>

The CLI build process runs the pertinent CSS preprocessor.

CLI 的构建过程会运行相关的预处理器。

When generating a component file with `ng generate component`, the CLI emits an empty CSS styles file (`.css`) by default.
Configure the CLI to default to your preferred CSS preprocessor as explained in the [Workspace configuration guide](guide/workspace-config#generation-schematics).

当使用 `ng generate component` 命令生成组件文件时，CLI 会默认生成一个空白的 CSS 样式文件（`.css`）。
你可以配置 CLI，让它默认使用你喜欢的 CSS 预处理器，参阅[工作区配置指南](guide/workspace-config#generation-schematics)中的解释。

<div class="alert is-important">

Style strings added to the `@Component.styles` array _must be written in CSS_ because the CLI cannot apply a preprocessor to inline styles.

添加到 `@Component.styles` 数组中的字符串*必须写成 CSS*，因为 CLI 没法对这些内联的样式使用任何 CSS 预处理器。

</div>

@reviewed 2021-09-17

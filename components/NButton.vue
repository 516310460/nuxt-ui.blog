<script>
import NButtonTheme from "../plugins/themes/default/NButton";

const {
  baseClass,
  defaultClass,
  primaryClass,
  // secondaryClass,
  // tertiaryClass,
  successClass,
  dangerClass,
  warningClass,
  disabledClass,
  defaultSizeClass,
  // largeSizeClass,
  // smallSizeClass,
  xsSizeClass,
  smSizeClass,
  baseSizeClass,
  lgSizeClass,
  xlSizeClass
} = NButtonTheme;

export default {
  name: "NButton",

  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    tagName: {
      type: String,
      default: "button",
      validator: function(value) {
        return ["button", "a"].indexOf(value) !== -1;
      }
    },
    value: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: "button"
    },
    href: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null,
      validator: function(value) {
        return (
          value === null ||
          [
            "primary",
            "secondary",
            "tertiary",
            "danger",
            "warning",
            "success"
          ].indexOf(value) !== -1
        );
      }
    },
    size: {
      type: String,
      default: null,
      validator: function(value) {
        return (
          value === null ||
          ["xs", "sm", "base", "lg", "xl"].indexOf(value) !== -1
        );
      }
    },
    method: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
      default: undefined
    },
    preserveState: {
      type: Boolean,
      default: false
    },
    preserveScroll: {
      type: Boolean,
      default: false
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: "router-link-active"
    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String,
      default: "router-link-exact-active"
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    defaultClass: {
      type: [String, Object, Array],
      default: defaultClass
    },
    primaryClass: {
      type: [String, Object, Array],
      default: primaryClass
    },
    // secondaryClass: {
    //   type: [String, Object, Array],
    //   default: secondaryClass
    // },
    // tertiaryClass: {
    //   type: [String, Object, Array],
    //   default: tertiaryClass
    // },
    successClass: {
      type: [String, Object, Array],
      default: successClass
    },
    dangerClass: {
      type: [String, Object, Array],
      default: dangerClass
    },
    warningClass: {
      type: [String, Object, Array],
      default: warningClass
    },
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
    },
    defaultSizeClass: {
      type: [String, Object, Array],
      default: defaultSizeClass
    },
    xsSizeClass: {
      type: [String, Object, Array],
      default: xsSizeClass
    },
    smSizeClass: {
      type: [String, Object, Array],
      default: smSizeClass
    },
    baseSizeClass: {
      type: [String, Object, Array],
      default: baseSizeClass
    },
    lgSizeClass: {
      type: [String, Object, Array],
      default: lgSizeClass
    },
    xlSizeClass: {
      type: [String, Object, Array],
      default: xlSizeClass
    }
    // largeSizeClass: {
    //   type: [String, Object, Array],
    //   default: largeSizeClass
    // },
    // smallSizeClass: {
    //   type: [String, Object, Array],
    //   default: smallSizeClass
    // }
  },

  computed: {
    /**
     * The default classes for the button
     * 按钮的默认类
     * @return {Array}
     */
    currentClass() {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${this.size || "default"}`,
        this.baseClass
      ];

      if (this.disabled) {
        classes.push(`${this.$options._componentTag}-disabled`);
        classes.push(this.disabledClass);
      }

      // if (this.size === null) {
      //   classes.push(this.defaultSizeClass);
      // } else if (this.size === "sm") {
      //   classes.push(this.smallSizeClass);
      // } else if (this.size === "lg") {
      //   classes.push(this.largeSizeClass);
      // }
      switch (this.size) {
        case "xs":
          classes.push(this.xsSizeClass);
          break;
        case "sm":
          classes.push(this.smSizeClass);
          break;
        case "base":
          classes.push(this.baseSizeClass);
          break;
        case "lg":
          classes.push(this.lgSizeClass);
          break;
        case "lg":
          classes.push(this.lgSizeClass);
          break;
        case "xl":
          classes.push(this.xlSizeClass);
          break;
        default:
          classes.push(this.defaultSizeClass);
          break;
      }

      switch (this.variant) {
        case "primary":
          classes.push(this.primaryClass);
          break;
        // case "secondary":
        //   classes.push(this.secondaryClass);
        //   break;
        // case "tertiary":
        //   classes.push(this.tertiaryClass);
        //   break;
        case "danger":
          classes.push(this.dangerClass);
          break;
        case "warning":
          classes.push(this.warningClass);
          break;
        case "success":
          classes.push(this.successClass);
          break;
        default:
          classes.push(this.defaultClass);
          break;
      }

      return classes;
    },

    isInertiaLinkComponentAvailable() {
      return !!this.$options.components.InertiaLink;
    },

    isRouterLinkComponentAvailable() {
      return !!(
        this.$options.components.RouterLink || this.$options.components.NuxtLink
      );
    },

    /**
     * If we have the `to` defined and the routerLink or Nuxt link component is available we can
     * use the create a router link
     * 如果定义了"to"，并且routerLink或Nuxt link组件可用，则可以
     * 使用创建路由器链接
     * @return {Boolean}
     */
    isARouterLink() {
      return this.to !== undefined && this.isRouterLinkComponentAvailable;
    },

    /**
     * If we have the `href` defined and the InertiaLink component is available we can
     * use to create an interia link
     * 如果我们定义了"href"并且InertiaLink组件可用，我们可以用于创建interia链接
     * @return {Boolean}
     */
    isAnIntertiaLink() {
      return this.href !== undefined && this.isInertiaLinkComponentAvailable;
    },

    /**
     * The component to render according to the props
     * 根据道具渲染的组件
     * @return {String}
     */
    componentToRender() {
      if (this.isARouterLink) {
        return (
          this.$options.components.NuxtLink ||
          this.$options.components.RouterLink
        );
      }

      if (this.isAnIntertiaLink) {
        return this.$options.components.InertiaLink;
      }

      if (this.href) {
        return "a";
      }

      return this.tagName;
    }
  },

  methods: {
    onBlur(e) {
      this.$emit("blur", e);
    },

    onFocus(e) {
      this.$emit("focus", e);
    },

    onClick(e) {
      this.$emit("click", e);
    },

    blur() {
      this.$el.blur();
    },

    focus() {
      this.$el.focus();
    },

    /**
     * Attrs according to the button type
     * 按钮类型
     * @return {Object}
     */
    getAttributes() {
      if (this.isAnIntertiaLink) {
        return {
          href: this.href,
          method: this.method,
          data: this.data,
          preserveState: this.preserveState,
          preserveScroll: this.preserveScroll,
          id: this.id,
          value: this.value,
          autofocus: this.autofocus,
          disabled: this.disabled,
          name: this.name,
          type: this.type
        };
      }
      if (this.isARouterLink) {
        return {
          to: this.to,
          replace: this.replace,
          append: this.append,
          tag: this.tagName,
          activeClass: this.activeClass,
          exact: this.exact,
          event: ["click", "focus", "blur"],
          exactActiveClass: this.exactActiveClass,
          id: this.id,
          value: this.value,
          autofocus: this.autofocus,
          disabled: this.disabled,
          name: this.name,
          type: this.type
        };
      }

      return {
        id: this.id,
        value: this.value,
        autofocus: this.autofocus,
        disabled: this.disabled,
        name: this.name,
        href: this.href,
        type: this.type
      };
    }
  },

  render: function(createElement) {
    var getChildrenTextContent = function(children) {
      return children
        .map(function(node) {
          return node.children
            ? getChildrenTextContent(node.children)
            : node.text;
        })
        .join("");
    };

    // 创建 kebab-case 风格的 ID
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, "-")
      .replace(/(^-|-$)/g, "");
    console.log(this.$slots.default);
    return createElement(
      this.componentToRender,
      {
        attrs: this.getAttributes(),
        class: this.currentClass,
        on: {
          click: this.onClick,
          focus: this.onFocus,
          blur: this.onBlur
        }
      },
      // [
      //   createElement(
      //     "a",
      //     {
      //       attrs: {
      //         name: headingId,
      //         href: "#" + headingId
      //       }
      //     },
      //     this.$slots.default
      //   )
      // ]
      this.$slots.default
    );
  }
};
</script>

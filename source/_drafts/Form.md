

在 React 里写表单，我们希望在数据源里有两份数据：一份是与服务器相同的『准确数据』，一份是正在编辑时用来展示的『临时数据』。（临时数据需要与 view 双向绑定）


还有一个是『提交数据』，或者说是『将临时数据处理成提交数据格式的纯函数』。（哪个组件知道如何处理呢？父 or 子）
考虑有20个表单项，5种表单类型的场景。
1. 可以在获取表单项数据时，建立表单 id 与类型的关系；
2. 在提交的时候想办法获取到其类型

『准确数据』只会根据接口的返回值来更改；『临时数据』实时相应用户的操作，在用户完成操作之后需要根据需求来及时清空。

目前的『临时数据』的储存方式有 X 种：iCafe 里使用 antd 的 Form

『准确数据的需求是？』（reset?）(reopen)

store 的数据应该分成两份吗？
而且这两份的格式也不尽相同，服务端可能是{id, fieldValue}
什么时机应该使用服务端数据更新 store？

能不能把 required, items 这些信息放在 Form 里？(貌似是可以的)
<!-- 1. 请求需要在组件外面发， -->
什么时候做同步啊？didMount里貌似是不行的。难道说这种做法还是不行的吗？因为用了条件渲染！！！！
也就是说第一次渲染的时候无法使用 setFieldsValue，convert/reset 这个动作要发生在别的地方
如果想舍弃掉 store，就必须做一些对于初始化的死代码。而 store 与 Form 同步只是在 mapPropsToFields 与 onPropsChange 的时候加一些逻辑，因此我觉得两个数据同步是相对来说更优的方法。
（一定要先把代码写出来（100%与80%完全不同））

必须要先 register 再 setFieldsValue 是一个合理的设计吗？
这阻碍了：先 set，再渲染。











没有涉及的需求：分步、分块表单

## react-jsonschema-form

三份数据构建表单：

- JSONSchema: 表单的信息，包括表单本身以及其内部字段的信息
- UISchema：字段信息，
- formData: 存放当前所有字段的值

##redux-form
注入了pristine, reset, submitting
自动判断 submitting 还是挺爽的，我们自己能做吗？
    - 外部传入一个 onSubmit， 



### 新建成功后，title 里的数据还在

【新建弹窗】
store 应该长什么样！！！？
真实数据：entities 里面
展示数据：目前是一份在 store 里面的初始数据，一份在 Form 里面的数据
（我们只需要一份展示数据，也就是说要么把 store 里的那个干掉，要么两个数据双向同步）
（由于级联，整个 Form 的结构都会变化，store 几乎没法干掉）

更新时机：
    - 目前是在 componentDidUpdate。
    - 应该是在 发送请求之后更新了 store 里的相关数据之后（感觉也在 Form 里实现比较好）




点击新建按钮时，应该传一个空的 initData 过去


打开方式：
新建：
- 新建按钮
- 快速建卡片（产品规划、卡片列表）可能携带标题、类型、计划、分组等等等初始数据
- 右浮新建子卡片
- 右浮新建并关联
- 新建弹窗中的继续建卡片
编辑：
- 右浮编辑按钮
- 快速编辑修改状态引起的工作流


典型需求：
### 空间/类型/状态级联
空间 -> 类型 -> 其他字段

1. action chain
2. componentDidUpdate
- 怎么写
- 缺点
3. 更好的方案？RxjS? Redux-Observable? Mobx?



### 代码分析

issueFieldRelData
56330是『迭代』字段还是『迭代一』选项 —— 是选项（难道能保证选项 id 不重复？）

外面应该再套一层？

```json
{
    // fieldId "A"
    "32564": {
        // fieldValue "X"
        "56330": [
            {
                "fieldType": "USER_PICKER",
                // 改名：去掉 rel
                "relFieldId": "responsiblePeopleId",
                "relItemValue": "dingyunpeng",
                "relItems": "",
                "relMask": null
            },
            {
                "fieldType": "TAG_TREE",
                "relFieldId": "21666",
                "relItemValue": "|tag-218606|",
                "relItems": "|tag-218607|tag-218606|tag-218605|",
                "relMask": null
            },
            {
                "fieldType": "NUMBER_FIELD",
                "relFieldId": "20008",
                "relItemValue": "",
                "relItems": "",
                "relMask": "HIDDEN"
            },
            {
                "fieldType": "CHECK_BOX_FIELD",
                "relFieldId": "80350",
                "relItemValue": "|211070|",
                "relItems": "|211070|",
                "relMask": "REQUIRED"
            }
        ]
    }
}
```


mapPropsToFields(props) {
    console.log('mapPropsToFields', props);
    return {
      email: createFormField(props.formState.email),
    };
  },
  onFieldsChange(props, fields) {
    console.log('onFieldsChange', fields);
    props.dispatch({
      type: 'save_fields',
      payload: fields,
    });
  },

isReledFieldData
被关联的字段

```json
{
    "20008": [
        {
            "displayName": "迭代",
            "id": "32564",
            "type": "SELECT_LIST"
        }
    ],
    "21666": [
        {
            "displayName": "迭代",
            "id": "32564",
            "type": "SELECT_LIST"
        }
    ],
    "80350": [
        {
            "displayName": "迭代",
            "id": "32564",
            "type": "SELECT_LIST"
        }
    ],
    "responsiblePeopleId": [
        {
            "displayName": "迭代",
            "id": "32564",
            "type": "SELECT_LIST"
        }
    ]
}
```

relListData(没用吧)

```json
{
    "32564": [
        {
            "displayName": "负责人",
            "id": "responsiblePeopleId",
            "type": "USER_PICKER"
        },
        {
            "displayName": "Tag",
            "id": "21666",
            "type": "TAG_TREE"
        },
        {
            "displayName": "估算工时",
            "id": "20008",
            "type": "NUMBER_FIELD"
        },
        {
            "displayName": "复选",
            "id": "80350",
            "type": "CHECK_BOX_FIELD"
        }
    ]
}
```

typeRelData（类型级联，待确认）
还需要验证一下类型级联，期待已经处理过。

需求确认：
级联有三种功能：

- 有选项的字段（select, radio, checkbox 等），可以控制显示哪些选项
- 控制某个字段的展示状态（隐藏、可选、必填）（目前改成必填之后没有重新渲染到上面，需要确认下需求，看怎么实现方便吧）(必填>隐藏>可选) (必填 > 只读 > 隐藏 > 可选)
- 控制某个字段的值

工作流：

- 配置下一个合法状态
- 控制某个状态下，某个字段的展示状态（隐藏、可选、必填、只读）

类型级联与模板冲突时：使用类型级联
可以级联的类型：select, radio, checkbox, tag, 模块, user_picker
如何处理级联的冲突：
工作流配置不能流转，在编辑里怎么处理：

NOTE:
前端也需要检查级联是否有环（理论上有环是不应该被创建的，安全考虑还是弄一个？）
之前没有 mask:hidden，之后需要考虑到
工作流与级联冲突时，以级联为主（需要确认？？）
顺序：
A-B,C
B-C
以哪个为准？（也是看实现吧）
已经隐藏了的字段不再修改值

工作流隐藏，级联必填，单页编辑隐藏

隐藏的时候提交的是啥？

父卡片也是可以隐藏的。

多选的时候是什么逻辑？
必填>隐藏
【是将逻辑合并】

模板呢？
可以理解成只读是所有权限里最大的？级联也无法影响只读。
假设工作流配置了 TAG 字段对 PM 只读，TAG 字段在级联里受


choose：
在顶层监听变化、做出改变：当选项变成其他时，还要记得变回去（『变回去』这个操作很不声明式）
or 组件各自监听，负责自己的状态：looks better(要是有什么响应式框架能有棒棒的语法糖就好了)
or 在 director 里面做一些操作
or 加一层来处理

方案1：在 onFieldsChange的时候改 store 里的 fields
方案2：字段自己准备（用 customEvent 好吗？）每个字段变更时


环的判断可以先写 todo
可以一边写测试一边写代码，顺便完善 best practice of ut（感觉一般不需要 enzyme 来测试组件，只测试函数功能就够了）



参考方案

react-jsonschema-form：三个 JSON 设计得有点难理解啊，感觉不是很正交
formik：比较轻量级，在我们的场景里不如用 redux-form
angular 的响应式表单与模板驱动表单：

重构（作为 buffer 吧，先保证级联能按时完成）：
- 写 selectors
- 去掉 Immutable
- 提前记录字段的类型，提交时不调用字段里面的信息
- from chain actions to reactive

响应式变成需要响应式框架吗（rxjs，mobx, redux-observable(RxJS middleware for action side effect，处理副作用？)）

响应式框架提供了什么能力：
mobx:


Form 的级联应该不算副作用，compute(issueFields(将异步请求到的 item 也放过来）, changeFields, rules)

回忆之前遇到过的问题：（级联功能要是能提出来一个组件轻松解决就好了）
迁移：切换空间时，级联计划中的选项

整理一下现在的表单数据
taskCreate
    - issueFields: 大部分的动态字段（plan, tag 的选项自取）（内容的处理）
    - title:
    - space
    - status
    - type
    - quickEditRel()


重写：
- MobX 提供了什么能力？RxJS 做不到吗？（还是需要仔细想想）


mobx 观察一个属性，属性改变时，autorun 里的函数自动触发（假设有 A->B 的级联规则，a 的 value 被观察，）
真的有什么是在 antd 的 onFieldsChange 做不到的吗？

RxJS：观察一个 action,总之还是很多 action 的映射，思考量要比 mobx 大
rxjs 的响应式体现在哪里呢？
mobx 可以观测 store，rxjs呢？

rxjs 做草稿这个功能应该会很使用啊

使用 级联规则.forEach(when(xxx)) 这样添加级联的规则

如果打算用这一套的话，
1. umijs/dawn/other
2. tslint, 百度标准
3. learn ts
4. learn mobx
5. learn mobx 在 github 上发布的其他东西（状态树是一个大活, devtools 的配置）
6. learn react-mobx-form
7. 准备写代码
8. 新代码库的话会有 nnnnnn多的问题，比如说字段，重写还是 copy 过去改？


- TS 提供了什么？

- 能为部门的 form-builder 作什么贡献？



Angular 的响应式表单能让实现响应式编程风格更容易，这种编程风格更倾向于在非 UI 的数据模型（通常接收自服务器）之间显式的管理数据流， 并且用一个 UI 导向的表单模型来保存屏幕上 HTML 控件的状态和值。 响应式表单可以让使用响应式编程模式、测试和校验变得更容易。


关于 iCafe 新建卡片的级联方案：
想了一整天，现在感觉不先用原始方法实现一遍的话，没法知道响应式框架比起现在基于事件的响应式所解决的痛点在哪，所以接下来的任务是：

前置工作：优化数据流，确保每个可级联的字段在 store 里，可以简单地修改是否必填、当前值、可见选项。
级联方案：
level0: 基于现在的代码，将级联的逻辑写在 antd Form 的 onFieldsChange 里面（本期目标）
level1: 基于 RxJS，使用 redux-observabal 引入其能力，改写之前的 actions（功能完成之后，在本地尝试重写，看看会不会提升开发效率）
level3: 新库+TS+MobX生态，把表单和所有 iCafe 用的表单控件提取出来，放到 npm


但其实这里实际是 store 里的一个数据修改引起了另一个数据修改，其实不需要 component 来参与。
didUpdate 也是一种响应式的，但这里的场景是数据都在顶层，组件不应该参与数据的修改，
如果把 store 放在

我觉得这里的区别是 if/else, rxjs, didUpdate都是 onModalChange -> dispatch(action) -> modifyModal
mobx 是 onModalChange -> modifyModal

是都可以实现，我也只是直觉上觉得 MobX 有一种就是为这个场景而存在，可以简化思维

是都可以实现，我也只是直觉上觉得 MobX 提供的很多函数在这个场景下很有用，但目前也没法保证就是会比其他方法简单，所以我在开始的时候说



需要确认：
0. 负责人是咋回事？为啥没有了？
1. 级联为啥要隐藏工作流的必填啊？？这是合理的吗？？？
2. bug 还是功能？冲突的级联，

初始化的时候开始级联？

现在的问题是：
如果想把 Form 与 store 连通，Form是包含了 space, title 这些静态字段的，

一个字段的标准格式：{name, type, mask, value, items}(其中的 value 可能会包含 label)
这些够吗？比如说 placeholder 之前是怎么处理的？
有一些写死的配置，比如说邮件里的展示

整体需要分块，静态+必填+内容+其他+层级关联+邮件
编辑时的状态



明天还要早起，8点半出发；8点左右起床




我就最后再想一遍，有没有更简单的办法来避免 reset：
onValuesChange: a字段改变，影响 b 字段的 mask 与 value。
dispatch 一个 action 来改 mask；setFieldsValue 来改 value。
如果 b,c,d 字段受到影响，将这三个字段影响到的数组合并，获得了影响到的 e,f,g,h
如果 b,c,b 字段收到影响（有冲突），value 就用后面的，mask 就在 reducer里面合并

最新逻辑：
在 api 里保证不会有两个字段影响到同一个，消除了级联冲突的情况（前端 OR 后端？交给后端了）
包括类型级联
增加一个 isCascaded？
取消级联的时候，value 保留，其他（items, mask）取原值
只有工作流可读的时候，才能用级联的 mask（因为没有冲突，不用考虑是被级联过的还是）



羡慕 icode，我也想把『升级 react』, 『webpack 换成 et』这种任务排进来


BUG:
快速编辑：类型级联没生效（所以说还是后端处理比较好吧嘿嘿嘿）
看来是不能去掉的，因为需要：permission, epic/feature (全局搜taskCreate.get('properties');)，优化空间很大啊


主要靠 issueFields 接口：
/issueFields/{spaceId}/{typeId}
/issueFields/{issueId}?stateId={stateId}
需要改成：
// 什么时候需要用 spaces 修饰？
spaces/{spaceCode}/types/{typeId}/issueFields
issues/{issueId}/issueFields
spaces/{spaceCode}/status/{statusId}/issueFields



关于 form 的 value:
在提交的时候会从 antd 需要的转成提交的格式
在右浮展示的时候，根据 issueFields 生成展示字符串
在渲染的时候会从

在 reset 的时候改格式，在具体 item 里面去掉处理格式的代码
根据 reset 之后的 issueFields 来渲染
0. 不能用 originFileds和 issueFileds 了，因为有好多其他地方在用（除非先来个全局替换），就叫：formFields



今天的任务：
store 的连通已经完成一半了，现在可以在 onValuesChange 里面通过 dispatch action 修改了
    棘手：不是所有字段都在 issuefields 里面，要加个判断吗？
    这个函数完成 store 连通就解决啦~+~



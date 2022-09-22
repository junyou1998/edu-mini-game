const { useState, useEffect } = React;

let chinese = '(男)老師好!'
const items = ['chào', '!', 'Em', 'ạ','thầy'];
const hiddenItemsOrder = ['Em', 'chào', 'thầy', 'ạ','!'];

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [] };


const App = () => {
  const [list, setList] = useState(items);
  const [DnD, setDnD] = useState(initialDnDState);
  const [isHiddenItemsOrderSet, setIsHiddenItemsOrderSet] = useState(false);
  const onDragStart = e => {
    setDnD({
      ...DnD,
      draggedFrom: Number(e.currentTarget.dataset.position), //0,1,2,3
      isDragging: true,
      originalOrder: list });

  };
  const onDragOver = e => {
    e.preventDefault();
    let newList = DnD.originalOrder;
    const draggedFrom = DnD.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, i) => i !== draggedFrom);
    newList = [
    ...remainingItems.slice(0, draggedTo),
    itemDragged,
    ...remainingItems.slice(draggedTo)];

    if (draggedTo !== DnD.draggedTo) {
      setDnD({
        ...DnD,
        updatedOrder: newList,
        draggedTo: draggedTo });

    }
  };
  const onDrop = e => {
    setList(DnD.updatedOrder);
    setDnD({
      ...DnD,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false });

  };
  const onDragLeave = e => {
    setDnD({
      ...DnD,
      draggedTo: null });

  };
  useEffect(() => {
    if (JSON.stringify(hiddenItemsOrder) === JSON.stringify(list)) {
      setIsHiddenItemsOrderSet(true);
    } else {
      setIsHiddenItemsOrderSet(false);
    }
  }, [list]);
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("p", null, "\uD83E\uDDE9 請重組成完整句子 \uD83E\uDDE9"), /*#__PURE__*/
    React.createElement("p", {id: 'chinese'}, `${chinese}`), /*#__PURE__*/
    React.createElement("ul", null,
    list.map((item, i) => /*#__PURE__*/
    React.createElement("li", {
      key: i,
      draggable: true,
      "data-position": i,
      onDragStart: onDragStart,
      onDragOver: onDragOver,
      onDrop: onDrop,
      onDragLeave: onDragLeave },
    item))),


    isHiddenItemsOrderSet ? /*#__PURE__*/React.createElement("div", { className: "succeed" }, "succeed\uD83D\uDE0E") : ''));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
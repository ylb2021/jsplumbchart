// import plumbGather from "jsplumb";

export default function(options) {
  // let instance = plumbGather.jsPlumb.getInstance({
  //   Container: options.container
  // });

  const instance = options.jsPlumb.getInstance({
    Container: options.container
  })

  instance.bind('click', function(c) {
    // instance.deleteConnection(c); //instance
    // options.delConnections(c, () => {
    // 	//instance.deleteConnection(c); //instance
    // 	//instance.detach(c);
    // });

    instance.deleteConnection(c) // instance
    // instance.detach(c);
  })

  instance.bind('connection', function(c) {
    options.completedConnect()
    return c
  })

  // 连接线删除时触发
  instance.bind('connectionDetached', function(c) {
    options.delConnections(c, () => {})
  })

  return instance
}

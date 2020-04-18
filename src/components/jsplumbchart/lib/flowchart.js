/* eslint-disable */
//节点类型
export function nodeClass(type) {
	switch (type) {
		//dataflow 端点左1，右-1
		case 'source':
		case 'sqlsource':
		case 'streaming_source':
		case 'source_dummy':
		case 'StartEvent':
			//case 'ConditionEvent':
			return 'classD_A';
		//dataflow 端点左1
		case 'sink':
		case 'show':
			return 'classD_B';
		//dataflow 端点左-1，右-1
		case 'union':
		case 'intersect':
		case 'starjoin':
			return 'classD_C';
		//dataflow 端点左1，右2 -1
		case 'decision':
		case 'split':
		case 'validate':
			return 'classD_D';
		//dataflow 端点左2 1，右1
		case 'join':
		case 'productjoin':
		case 'minus':
			return 'classD_E';
		//workflow 端点左-1，右-1
		case 'dataflow':
		case 'hawq':
		case 'hive':
		case 'mapreduce':
		case 'shell':
		case 'spark':
		case 'event':
		case 'exclusive':
		case 'parallel':
			return 'classW_C';
		//other 端点左1，右1
		default:
			return 'classO';
	}
}

//字体图标的变量（需跟iconFont字体包同步）
var nodeIconFont = {
	source: 'source',
	sqlsource: 'sqlsource',
	sink: 'sink',
	decision: 'decision',
	validate: 'validate',
	supplement: 'supplement',
	sql: 'sql',
	transform: 'transform',
	filter: 'filter',
	sample: 'sample',
	lookup: 'lookup',
	join: 'join',
	starjoin: 'starjoin',
	productjoin: 'productjoin',
	aggregate: 'aggregate',
	top: 'top',
	union: 'union',
	intersect: 'intersect',
	minus: 'minus',
	split: 'split',
	Correlation: 'Correlation',
	Summary: 'Summary',
	gradientboogradientbostedtrees_predict: 'gradientboogradientbostedtrees_predict',
	MultilayerPerceptronPredict: 'MultilayerPerceptronPredict',
	MultilayerPerceptronTrain: 'MultilayerPerceptronTrain',
	kmeans_predict: 'kmeans_predict',
	kmeans_train: 'kmeans_train'
	// aggregate: "aggregate"
};
//节点图标函数
export function nodeIcon(type) {
	if (type in nodeIconFont) {
		return 'iconTrue';
	} else {
		return false;
	}
}

export function specialNodeClass(type) {
	switch (type) {
		//dataflow 左1 右2 yse -1 no -1
		case 'decision':
		case 'split':
			return 'classD_D1';
		//dataflow 左1 右2 ok -1 error -1
		case 'validate':
			return 'classD_D2';
		//dataflow 左2 left 1 right 1 右-1
		case 'join':
		case 'productjoin':
			return 'classD_E1';
		//dataflow 左2 input1 1 input2 1 right 1 右-1
		case 'minus':
			return 'classD_E2';
		//worflow 特殊节点 左-1 右-1
		case 'dataflow':
			return 'classW_A';
		// case "aggregate":
		//   return "classW_A";
	}
}

/**
 *
 * jsPlumb设计器 设置参数
 * ------------------------------------------------------------------
 */
export var connectorPaintStyle = {
	//基本连接线样式
	strokeWidth: 2,
	stroke: '#4e5568',
	joinstyle: 'round',
	outlineColor: 'white',
	outlineWidth: 0
};
export var connectorHoverStyle = {
	// 鼠标悬浮在连接线上的样式
	strokeWidth: 3,
	stroke: '#ff4e4e',
	outlineColor: 'white',
	outlineWidth: 0
};
export var origin = {
	//起点
	endpoint: [ 'Dot', { radius: 8 } ], //端点的形状
	connectorStyle: connectorPaintStyle, //连接线的颜色，大小样式
	connectorHoverStyle: connectorHoverStyle,
	paintStyle: {
		stroke: '#4e5568',
		fill: 'transparent',
		radius: 6,
		lineWidth: 6
	}, //端点的颜色样式
	//anchor: "AutoDefault",
	isSource: true, //是否可以拖动（作为连线起点）
	connector: [ 'Flowchart', { stub: [ 5, 5 ], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
	isTarget: false, //是否可以放置（连线终点）
	maxConnections: 1, // 设置连接点最多可以连接几条线,-1表示无限大
	connectorOverlays: [ [ 'Arrow', { width: 10, length: 10, location: 1 } ] ]
};
export var destination = {
	//终点
	endpoint: [ 'Dot', { radius: 6 } ], //端点的形状
	connectorStyle: connectorPaintStyle, //连接线的颜色，大小样式
	connectorHoverStyle: connectorHoverStyle,
	paintStyle: { fill: '#4e5568' }, //端点的颜色样式
	isSource: false, //是否可以拖动（作为连线起点）
	connector: [ 'Straight', { stub: [ 5, 5 ], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
	isTarget: true, //是否可以放置（连线终点）
	maxConnections: 1, // 设置连接点最多可以连接几条线,-1表示无限大
	connectorOverlays: [ [ 'Arrow', { width: 10, length: 10, location: 1 } ] ]
};

export const addEndpointToNode = (jsplumbInstance, self, steps, flowData, _) => {
	jsplumbInstance.deleteEveryEndpoint();
	self.$nextTick(() => {
		steps.forEach((data, index) => {
			let drawType = data.type,
				dataIndex = data.id;

			//节点锚点添加
			//左侧无，右侧一个起点
			if (nodeClass(drawType) == 'classD_A') {
				//jsplumbInstance.deleteEndpoint(dataIndex + "output" + "origin");
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'RightMiddle', maxConnections: 100 },
					{ uuid: dataIndex + 'output' + 'origin', ...origin }
				);
			} else if (nodeClass(drawType) == 'classD_B') {
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'LeftMiddle' },
					{ uuid: dataIndex + 'input' + 'destination', ...destination }
				);
			} else if (nodeClass(drawType) == 'classD_C' || nodeClass(drawType) == 'classW_C') {
				//左侧一个终点（多），右侧起点(多)
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'LeftMiddle', maxConnections: -1 },
					{ uuid: dataIndex + 'input' + 'destination', ...destination }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'RightMiddle', maxConnections: -1 },
					{ uuid: dataIndex + 'output' + 'origin', ...origin }
				);
			} else if (specialNodeClass(drawType) == 'classD_D1') {
				//return;
				let anchors = addMultioutput(getOutputConfigurations(data.outputConfigurations, _));

				// console.log("data", data);
				// console.log("anchors", anchors);
				// console.log(
				//   "getOutputConfigurations(data.outputConfigurations, _)",
				//   getOutputConfigurations(data.outputConfigurations, _)
				// );
				// console.log("data.outputConfigurations", data.outputConfigurations);
				// console.log(_.toArray(data.outputConfigurations));

				// let keyList = getKeyList(data.outputConfigurations);
				// console.log("keyList", keyList);

				_.forEach(anchors, (val, index) => {
					//let label = "output" + (index + 1);
					jsplumbInstance.addEndpoint(
						dataIndex,
						{
							anchors: val.value,
							maxConnections: -1,
							overlays: [
								[
									'Label',
									{
										location: [ 3.5, 0 ],
										// location: index % 2 == 0 ? [3.5, 0] : [-3.5, 0],
										label: val.key,
										cssClass: 'endpointSourceLabelMult'
									}
								]
							]
						},
						{ uuid: dataIndex + val.key + 'origin', ...origin }
					);
				});

				//left

				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'LeftMiddle' },
					{ uuid: dataIndex + 'input' + 'destination', ...destination }
				);
				// jsplumbInstance.addEndpoint(
				//   dataIndex,
				//   { anchors: "LeftMiddle" },
				//   { uuid: dataIndex + "input" + "destination", ...destination }
				// );
			} else if (specialNodeClass(drawType) == 'classD_D2') {
				jsplumbInstance.addEndpoint(
					dataIndex,
					{
						anchors: [ 1, 0.3, 0, 0 ],
						maxConnections: -1,
						overlays: [
							[
								'Label',
								{
									location: [ 1.5, -0.5 ],
									label: 'ok',
									cssClass: 'endpointSourceLabel'
								}
							]
						]
					},
					{ uuid: dataIndex + 'ok' + 'origin', ...origin }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{
						anchors: [ 1, 0.7, 0, 0 ],
						maxConnections: -1,
						overlays: [
							[
								'Label',
								{
									location: [ 1.5, 1.3 ],
									label: 'error',
									cssClass: 'endpointSourceLabel'
								}
							]
						]
					},
					{ uuid: dataIndex + 'error' + 'origin', ...origin }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'LeftMiddle' },
					{ uuid: dataIndex + 'input' + 'destination', ...destination }
				);
			} else if (specialNodeClass(drawType) == 'classD_E1') {
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'RightMiddle', maxConnections: -1 },
					{ uuid: dataIndex + 'output' + 'origin', ...origin }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{
						anchors: [ 0, 0.3, 0, 0 ],
						overlays: [
							[
								'Label',
								{
									location: [ -1, -0.5 ],
									label: 'left',
									cssClass: 'endpointSourceLabel'
								}
							]
						]
					},
					{ uuid: dataIndex + 'left' + 'destination', ...destination }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{
						anchors: [ 0, 0.7, 0, 0 ],
						overlays: [
							[
								'Label',
								{
									location: [ -1, 1.5 ],
									label: 'right',
									cssClass: 'endpointSourceLabel'
								}
							]
						]
					},
					{ uuid: dataIndex + 'right' + 'destination', ...destination }
				);
			} else if (specialNodeClass(drawType) == 'classD_E2') {
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'RightMiddle', maxConnections: -1 },
					{ uuid: dataIndex + 'output' + 'origin', ...origin }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{
						anchors: [ 0, 0.3, 0, 0 ],
						overlays: [
							[
								'Label',
								{
									location: [ -1, -0.5 ],
									label: 'input1',
									cssClass: 'endpointSourceLabel'
								}
							]
						]
					},
					{ uuid: dataIndex + 'input1' + 'destination', ...destination }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{
						anchors: [ 0, 0.7, 0, 0 ],
						overlays: [
							[
								'Label',
								{
									location: [ -1, 1.5 ],
									label: 'input2',
									cssClass: 'endpointSourceLabel'
								}
							]
						]
					},
					{ uuid: dataIndex + 'input2' + 'destination', ...destination }
				);
			} else {
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'RightMiddle', maxConnections: -1 },
					{ uuid: dataIndex + 'output' + 'origin', ...origin }
				);
				jsplumbInstance.addEndpoint(
					dataIndex,
					{ anchors: 'LeftMiddle', maxConnections: drawType == 'sql' ? -1 : 1 },
					{ uuid: dataIndex + 'input' + 'destination', ...destination }
				);
			}
			jsplumbInstance.draggable(dataIndex, {
				// containment: 'parent',
				start(params) {
					// 拖动开始
					// console.log(params);
					//console.log("拖动开始");
				},
				drag(params) {
					// 拖动中
				},
				stop(params) {
					let top = params.el.style.top;
					let left = params.el.style.left;
					// 拖动结束
					// console.log("拖动介绍");
					flowData({
						x: parseInt(left.replace('px', '')),
						y: parseInt(top.replace('px', '')),
						id: params.el.attributes.id.nodeValue
					});
				}
			});
		});
	});
};

export const getOutputConfigurations = (val, _) => {
	let result = [];
	_.forEach(val, (value, key) => {
		result.push({ key: key, value: value });
	});
	return result;
};

// 参数 val output 个数
export const addMultioutput = (list) => {
	//右边多输出 [1,20] 默认或者最小为1，上限20
	// [1, 0, 0, 0]

	let val = list.length;

	let lineheight = 1;
	let y = 0;

	switch (val) {
		case 21:
		case 20:
		case 19:
		case 18:
		case 17:
			lineheight = 4;
			y = -1.33;
			break;
		case 16:
		case 15:
			lineheight = 4;
			y = -1.25;
			break;
		case 14:
		case 13:
		case 12:
			lineheight = 3;
			y = -0.73;
			break;

		case 11:
			// case 10:
			lineheight = 2.5;
			y = -0.65;
			break;

		case 10:
			lineheight = 2.5;
			y = -0.6;
			break;
		case 9:
		case 8:
			lineheight = 2;
			y = -0.45;
			break;

		case 7:
			lineheight = 1.8;
			y = -0.2;
			break;

		case 5:
			lineheight = 2;
			y = -0.33;
			break;
		case 6:
			lineheight = 2;
			y = -0.35;
			break;
		case 4:
		case 3:
			lineheight = 1;
			y = 0.15;
			break;
		case 2:
			lineheight = 1;
			y = 0.25;
			break;
		case 1:
			lineheight = 1;
			y = 0.5;
			break;
		default:
			'';
	}

	let distance = lineheight / val;
	let result = [];

	for (let j = 0; j < list.length; j++) {
		result.push({ key: list[j].key, value: [ 1, y, 0, 0 ] });
		y += distance;
	}

	return result;
};

export const connect = (jsplumbInstance, self, links, connectCallback) => {
	self.$nextTick(() => {
		//节点之间连线
		links.forEach((item) => {
			jsplumbInstance.connect({
				uuids: [ item.source + item.sourceOutput + 'origin', item.target + item.input + 'destination' ]
			});
		});
		connectCallback();
	});
};

export const getNodeType = (drawType) => {
	if (nodeClass(drawType) == 'classD_A') {
		return 'RightMiddle1';
	} else if (nodeClass(drawType) == 'classD_B') {
		return 'LeftMiddle1';
	} else if (nodeClass(drawType) == 'classD_C' || nodeClass(drawType) == 'classW_C') {
		return 'LeftMiddle1RightMiddle1';
	} else if (specialNodeClass(drawType) == 'classD_D1') {
		return 'LeftMiddle1yesno';
	} else if (specialNodeClass(drawType) == 'classD_D2') {
		return 'LeftMiddle1okerror';
	} else if (specialNodeClass(drawType) == 'classD_E1') {
		return 'leftrightRightMiddle';
	} else if (specialNodeClass(drawType) == 'classD_E2') {
		return 'input1input2RightMiddle';
	} else {
		return 'LeftMiddle1RightMiddle1';
	}
};

export const setClass = (type) => {
	let result = '';
	if (type == 'classD_A') {
		result = 't1Style';
	} else if (type == 'classD_B') {
		result = 't3Style';
	} else {
		result = 't2Style';
	}

	return result;
};

export const filterLinkData = (data, _) => {
	return _.map(data, (value) => {
		//sourceOutput
		if (value.sourceOutput) {
			value.sourceOutput = value.sourceOutput;
		} else {
			value.sourceOutput = 'output';
		}

		//targetInput

		if (nodeClass(value.targetInput) == 'classD_C') {
			value.targetInput = value.source;
		}

		if (value.input) {
			value.targetInput = value.input;
		} else {
			value.targetInput = 'input';
		}

		//input
		if (value.input) {
			value.input = value.input;
		} else {
			value.input = 'input';
		}

		return value;
	});
};

// export const filterLinkData = (data, _) => {
//   return _.map(data, value => {
//     //过滤sourceOutput
//     if (value.sourceOutput == "yes") {
//       value.sourceOutput = "yes";
//     } else if (value.sourceOutput == "no") {
//       value.sourceOutput = "no";
//     } else if (value.sourceOutput == "ok") {
//       value.sourceOutput = "ok";
//     } else if (value.sourceOutput == "error") {
//       value.sourceOutput = "error";
//     } else {
//       value.sourceOutput = "output";
//     }

//     ////过滤targetInput

//     if (nodeClass(value.targetInput) == "classD_C") {
//       value.targetInput = value.source;
//     } else if (value.input == "input1") {
//       value.targetInput = "input1";
//     } else if (value.input == "input2") {
//       value.targetInput = "input2";
//     } else if (value.input == "right") {
//       value.targetInput = "right";
//     } else if (value.input == "left") {
//       value.targetInput = "left";
//     } else {
//       value.targetInput = "input";
//     }

//     ////过滤input

//     if (value.input == "left") {
//       value.input = "left";
//     } else if (value.input == "right") {
//       value.input = "right";
//     } else if (value.input == "input1") {
//       value.input = "input1";
//     } else if (value.input == "input2") {
//       value.input = "input2";
//     } else {
//       value.input = "input";
//     }

//     return value;
//   });
// };

export const message = (message, callback, self) => {
	self
		.$confirm(message, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
		.then(() => {
			self.$message({
				type: 'success',
				message: '删除成功!'
			});
			callback();
		})
		.catch(() => {
			self.$message({
				type: 'info',
				message: '已取消删除'
			});
		});
};

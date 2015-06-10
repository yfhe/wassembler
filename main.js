var demo = {};

(function(exports) {
  exports.run = function() {
    var m = wasm.Module({
      funcs: [
	wasm.Function({
	  name: "bar",
	  argCount: 1,
	  returnType: "i32",
	  locals: [
	    "i32",
	    "i32",
	  ],
	  body: [
	    wasm.Return({
	      expr: wasm.BinaryOp({
		left: wasm.ConstI32({value: 7}),
		op: "+",
		right: wasm.GetLocal({index: 0}),
	      }),
	    }),
	  ],
	}),
	wasm.Function({
	  name: "foo",
	  argCount: 0,
	  returnType: "i32",
	  locals: [
	  ],
	  body: [
	    wasm.Return({
	      expr: wasm.BinaryOp({
		left: wasm.BinaryOp({
		  left: wasm.ConstI32({value: 2}),
		  op: "-",
		  right: wasm.ConstI32({value: 3}),
		}),
		op: "*",
		right: wasm.CallDirect({
		  func: 0,
		  args: [
		    wasm.ConstI32({value: 5}),
		  ],
		}),
	      }),
	    }),
	  ],
	}),
      ],
    });
    var src = wasm.GenerateJS(m);
    console.log(src);
    var compiled = eval(src);
    console.log(compiled.foo());

    demo.m = compiled;
  };
})(demo);

module.exports = {

"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/Documents/instant-demo/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/Documents/instant-demo/node_modules/@instantdb/react/dist/module/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/Documents/instant-demo/node_modules/@instantdb/core/dist/module/schema.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$module$2f$init$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/Documents/instant-demo/node_modules/@instantdb/react/dist/module/init.js [app-ssr] (ecmascript)");
"use client";
;
// ID for app: finance-app
const APP_ID = "e1067022-0a5c-472c-a97b-b3caf26ac02d";
// finance schema
const financeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].schema({
    entities: {
        finances: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].entity({
            description: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].string(),
            transactionAmount: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].number(),
            transactionCost: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].number(),
            paidOn: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].date()
        })
    }
});
const financeDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$react$2f$dist$2f$module$2f$init$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["init"])({
    appId: APP_ID,
    financeSchema
});
// Optional: Declare your schema!
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].schema({
    entities: {
        todos: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].entity({
            text: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].string(),
            done: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].boolean(),
            createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$instant$2d$demo$2f$node_modules$2f40$instantdb$2f$core$2f$dist$2f$module$2f$schema$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"].number()
        })
    }
}); // function App() {
 //   // Read Data
 //   const { isLoading, error, data } = db.useQuery({ todos: {} });
 //   if (isLoading) {
 //     return;
 //   }
 //   if (error) {
 //     return <div className="text-red-500 p-4">Error: {error.message}</div>;
 //   }
 //   const { todos } = data;
 //   return (
 //     <div className="font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
 //       <h2 className="tracking-wide text-5xl text-gray-300">todos</h2>
 //       <div className="border border-gray-300 max-w-xs w-full">
 //         <TodoForm todos={todos} />
 //         <TodoList todos={todos} />
 //         <ActionBar todos={todos} />
 //       </div>
 //       <div className="text-xs text-center">
 //         Open another tab to see todos update in realtime!
 //       </div>
 //     </div>
 //   );
 // }
 // Write Data
 // ---------
 // function addTodo(text: string) {
 //   db.transact(
 //     db.tx.todos[id()].update({
 //       text,
 //       done: false,
 //       createdAt: Date.now(),
 //     })
 //   );
 // }
 // function deleteTodo(todo: Todo) {
 //   db.transact(db.tx.todos[todo.id].delete());
 // }
 // function toggleDone(todo: Todo) {
 //   db.transact(db.tx.todos[todo.id].update({ done: !todo.done }));
 // }
 // function deleteCompleted(todos: Todo[]) {
 //   const completed = todos.filter((todo) => todo.done);
 //   const txs = completed.map((todo) => db.tx.todos[todo.id].delete());
 //   db.transact(txs);
 // }
 // function toggleAll(todos: Todo[]) {
 //   const newVal = !todos.every((todo) => todo.done);
 //   db.transact(
 //     todos.map((todo) => db.tx.todos[todo.id].update({ done: newVal }))
 //   );
 // }
 // Components
 // ----------
 // function ChevronDownIcon() {
 //   return (
 //     <svg viewBox="0 0 20 20">
 //       <path
 //         d="M5 8 L10 13 L15 8"
 //         stroke="currentColor"
 //         fill="none"
 //         strokeWidth="2"
 //       />
 //     </svg>
 //   );
 // }
 // function TodoForm({ todos }: { todos: Todo[] }) {
 //   return (
 //     <div className="flex items-center h-10 border-b border-gray-300">
 //       <button
 //         className="h-full px-2 border-r border-gray-300 flex items-center justify-center"
 //         onClick={() => toggleAll(todos)}
 //       >
 //         <div className="w-5 h-5">
 //           <ChevronDownIcon />
 //         </div>
 //       </button>
 //       <form
 //         className="flex-1 h-full"
 //         onSubmit={(e) => {
 //           e.preventDefault();
 //           const input = e.currentTarget.input as HTMLInputElement;
 //           addTodo(input.value);
 //           input.value = "";
 //         }}
 //       >
 //         <input
 //           className="w-full h-full px-2 outline-none bg-transparent"
 //           autoFocus
 //           placeholder="What needs to be done?"
 //           type="text"
 //           name="input"
 //         />
 //       </form>
 //     </div>
 //   );
 // }
 // function TodoList({ todos }: { todos: Todo[] }) {
 //   return (
 //     <div className="divide-y divide-gray-300">
 //       {todos.map((todo) => (
 //         <div key={todo.id} className="flex items-center h-10">
 //           <div className="h-full px-2 flex items-center justify-center">
 //             <div className="w-5 h-5 flex items-center justify-center">
 //               <input
 //                 type="checkbox"
 //                 className="cursor-pointer"
 //                 checked={todo.done}
 //                 onChange={() => toggleDone(todo)}
 //               />
 //             </div>
 //           </div>
 //           <div className="flex-1 px-2 overflow-hidden flex items-center">
 //             {todo.done ? (
 //               <span className="line-through">{todo.text}</span>
 //             ) : (
 //               <span>{todo.text}</span>
 //             )}
 //           </div>
 //           <button
 //             className="h-full px-2 flex items-center justify-center text-gray-300 hover:text-gray-500"
 //             onClick={() => deleteTodo(todo)}
 //           >
 //             X
 //           </button>
 //         </div>
 //       ))}
 //     </div>
 //   );
 // }
 // function ActionBar({ todos }: { todos: Todo[] }) {
 //   return (
 //     <div className="flex justify-between items-center h-10 px-2 text-xs border-t border-gray-300">
 //       <div>Remaining todos: {todos.filter((todo) => !todo.done).length}</div>
 //       <button
 //         className=" text-gray-300 hover:text-gray-500"
 //         onClick={() => deleteCompleted(todos)}
 //       >
 //         Delete Completed
 //       </button>
 //     </div>
 //   );
 // }
 // export default App;
}}),
"[project]/Documents/instant-demo/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__69c7a9._.js.map
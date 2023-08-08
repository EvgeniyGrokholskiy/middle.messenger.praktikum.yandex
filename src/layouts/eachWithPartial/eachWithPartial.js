export default function eachWithPartial(context, options) {
  let ret = '';
  for (let i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }
  return ret;
}
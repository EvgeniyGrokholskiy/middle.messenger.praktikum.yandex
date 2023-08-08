export default function card(context, options) {

  const template = Handlebars.compile(
    `
      <div class='{{class}}'>
        ${options.fn(this)}
        {{text}}
      </div>
    `
  );
  return template({ ...context, ...options });
};
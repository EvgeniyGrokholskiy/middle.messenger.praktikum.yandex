import * as handlebars from 'handlebars';

export default function card(context, options) {
  const template = handlebars.compile(
    `
      <div class='{{class}}'>
        ${options.fn(this)}
        {{text}}
      </div>
    `,
  );
  return template({ ...context, ...options });
}

// TODO: Improve typings
export const userSessionResolver = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (args.me !== true) throw new Error("Unsupported argument value");

  return context.res.locals.userSession;
};

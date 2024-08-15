import { Actions } from "./TableComponent";

type ActionButtonProps<T> = {
  actionHandlers: Actions<T>;
  actions: JSX.Element[];
  row: T;
};

export const ActionButtons = <T,>({
  actionHandlers,
  actions,
  row,
}: ActionButtonProps<T>) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {actionHandlers.edit && (
        <button onClick={() => actionHandlers.edit!(row)}>{actions[0]}</button>
      )}
      {actionHandlers.add && (
        <button onClick={() => actionHandlers.add!(row)}>{actions[1]}</button>
      )}
      {actionHandlers.download && (
        <button onClick={() => actionHandlers.download!(row)}>
          {actions[2]}
        </button>
      )}
      {actionHandlers.remove && (
        <button onClick={() => actionHandlers.remove!(row)}>
          {actions[3]}
        </button>
      )}
      {actionHandlers.restart && (
        <button onClick={() => actionHandlers.restart!(row)}>
          {actions[4]}
        </button>
      )}
    </div>
  );
};

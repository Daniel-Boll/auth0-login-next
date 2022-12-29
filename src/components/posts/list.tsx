import React from "react";
import { useTranslate, useMany, Option, useSelect } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
  GridValueFormatterParams,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "src/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";

export const PostList: React.FC = () => {
  const { user } = useUser()
  console.log({ user })
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<IPost>();

  const {
    options,
    queryResult: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
    hasPagination: false,
  });

  const columns = React.useMemo<GridColumns<IPost>>(
    () => [
      {
        field: "id",
        headerName: t("posts.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "title",
        headerName: t("posts.fields.title"),
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: t("posts.fields.category"),
        type: "singleSelect",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        valueOptions: options,
        valueFormatter: (params: GridValueFormatterParams<Option>) => {
          return params.value;
        },
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          const category = options.find(
            (item) => item.value.toString() === row.category.id.toString()
          );
          return category?.label;
        },
      },
      {
        field: "status",
        headerName: t("posts.fields.status.title"),
        minWidth: 120,
        flex: 0.3,
        type: "singleSelect",
        valueOptions: ["draft", "published", "rejected"],
      },
      {
        field: "actions",
        type: "actions",
        headerName: t("table.actions"),
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton size="small" hideText recordItemId={row.id} />
              <DeleteButton size="small" hideText recordItemId={row.id} />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [t, options, isLoading]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

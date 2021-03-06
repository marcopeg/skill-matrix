import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { LOAD_RESOURCES_LIST } from "./use-resources-list";

const DELETE_VALUE = gql`
  mutation deleteResValue($id: Int!) {
    delete_res_values_by_pk(id: $id) {
      id
    }
  }
`;

const useResourceDeleteValue = ({ projectId, resourceId, data }) => {
  const history = useHistory();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [deleteValue] = useMutation(DELETE_VALUE, {
    refetchQueries: [
      {
        query: LOAD_RESOURCES_LIST
      }
    ]
  });

  const openConfirm = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirm = evt => {
    setIsConfirmOpen(false);
  };

  const submitDelete = confirm => {
    if (confirm.name !== data.name) {
      alert("Wrong name");
      return;
    }
    return deleteValue({ variables: { id: resourceId } })
      .then(() => {
        closeConfirm();
        history.push(`/p/${projectId}/resources`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return {
    isConfirmOpen,
    projectId,
    resourceId,
    closeConfirm,
    openConfirm,
    submitDelete
  };
};

export default useResourceDeleteValue;

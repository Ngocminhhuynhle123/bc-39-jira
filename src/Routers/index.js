import { lazy } from "react";
import { Route } from "react-router-dom";
const routers = [
  {
    path: "/",
    element: lazy(() => import("./../pages/Jira-Admin/")),
    nested: [
        {
            path: "/",
            element: lazy(() => import('./../pages/Jira-Admin/projectManagement')),
        },
        {
            path: "/createProject",
            element: lazy(() => import('./../pages/Jira-Admin/createProject')),
        },
        {
            path: "/myProfile",
            element: lazy(() => import('./../pages/Jira-Admin/myProfile')),
        },
        {
            path: "/projectDetail/:id",
            element: lazy(() => import('./../pages/Jira-Admin/projectDetail')),
        },
        {
            path: "/userManagement",
            element: lazy(() => import('./../pages/Jira-Admin/userManagement')),
        },

    ]
},
{
    path: "/logInjiraa",
    element: lazy(() => import("./../pages/Jira-Admin/authPages")),
  },
];
export const renderRouter = () => {
  return routers.map((router) => {
    if (router.nested) {
      return (
        <Route
          key={router.path}
          path={router.path}
          element={<router.element />}
        >
          {router.nested.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            );
          })}
        </Route>
      );
    } else {
      return (
        <Route
          key={router.path}
          path={router.path}
          element={<router.element />}
        />
      );
    }
  });
};

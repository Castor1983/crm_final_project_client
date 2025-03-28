import React from 'react';
import { toast } from 'react-toastify';

import { managersUrl, urls } from '../common/urls.ts';
import { CommentInterface } from '../interfaces/comment.interface.ts';
import { GroupInterface } from '../interfaces/group.interface.ts';
import { LoginForm } from '../interfaces/loginForm.interface.ts';
import { ManagerInterface } from '../interfaces/manager.interface.ts';
import { StatsInterface } from '../interfaces/stats.interface.ts';
import { api, apiAuth } from '../services/api.ts';
import { useAuthStore } from '../store/auth.ts';

const fetchGroups = async (setGroups: (groups: GroupInterface[]) => void) => {
  try {
    const groupsResponse = await apiAuth.get(urls.orders.groups);
    setGroups(groupsResponse.data);
  } catch (error) {
    console.error('Error when removing a group:', error);
  }
};

const fetchOrdersExportToExcel = async (params: { [p: string]: string }) => {
  return await apiAuth.get(urls.orders.exportToExcel, {
    params: params,
  });
};

const fetchAuth = async (data: LoginForm) => {
  return await api.post(urls.auth.signIn, data);
};

const fetchRefresh = async () => {
  try {
    const response = await api.post(
      urls.auth.refresh,
      {},
      { withCredentials: true },
    );
    const newAccessToken = response.data.accessToken;
    useAuthStore.getState().login(newAccessToken);
  } catch {
    useAuthStore.getState().logout();
  }
};

const fetchManagers = async (
  setStats: (stats: StatsInterface) => void,
  setManagers: (managers: ManagerInterface[]) => void,
) => {
  try {
    const managersResponse = await apiAuth.get(managersUrl);

    setStats(managersResponse.data.orderStats);
    setManagers(managersResponse.data.data);
  } catch (err) {
    console.error('Error fetching managers:', err);
    toast.error('Failed to load managers', { autoClose: 3000 });
  }
};

const fetchCreateManager = async (manager: ManagerInterface) => {
  await apiAuth.post(managersUrl, manager);
};

const fetchActivateManager = async (managerId: string) => {
  return await apiAuth.post(urls.managers.activateManager(managerId));
};

const fetchRecoveryPassword = async (managerId: string) => {
  return await apiAuth.post(urls.managers.deactivate(managerId));
};

const fetchBanManager = async (managerId: string) => {
  await apiAuth.patch(urls.managers.ban(managerId));
};

const fetchUnbanManager = async (managerId: string) => {
  await apiAuth.patch(urls.managers.unban(managerId));
};

const fetchActivatePassword = async (
  activateToken: string | undefined,
  password: string,
) => {
  await api.post(urls.managers.activatePassword(activateToken), {
    password: password,
  });
};

const fetchComments = async (
  orderId: number,
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>,
) => {
  try {
    const commentsResponse = await apiAuth.get(urls.orders.orderById(orderId));
    setComments(commentsResponse.data.comments);
  } catch (error) {
    console.error('Could not get comments', error);
  }
};

const fetchAddComment = async (orderId: number, comment: string) => {
  await apiAuth.post(urls.orders.addComment(orderId), {
    body: comment,
  });
};

const fetchAddGroup = async (newGroup: string) => {
  return await apiAuth.post(urls.orders.groups, { name: newGroup });
};

const fetchUpdateOrder = async (
  orderId: string,
  updatedOrder: { [p: string]: any },
) => {
  await apiAuth.patch(urls.orders.editOrder(orderId), updatedOrder);
};

export {
  fetchGroups,
  fetchOrdersExportToExcel,
  fetchAuth,
  fetchManagers,
  fetchCreateManager,
  fetchActivateManager,
  fetchRecoveryPassword,
  fetchBanManager,
  fetchUnbanManager,
  fetchActivatePassword,
  fetchComments,
  fetchAddComment,
  fetchAddGroup,
  fetchUpdateOrder,
  fetchRefresh,
};

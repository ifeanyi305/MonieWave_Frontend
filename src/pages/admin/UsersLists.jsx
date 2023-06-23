import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { deleteUser } from '../../redux/superUser/deleteUser';
import { updateUserStatus } from '../../redux/superUser/updateUserStatus';
import { updateUserRole } from '../../redux/superUser/updateUserRole';
import { useNavigate } from 'react-router-dom';

const UsersLists = () => {
  const { progress, loading, failed } = useSelector((state) => state.userDetails)
  const { success, pending, error } = useSelector((state) => state.terminateUser)
  const [transferStatus, setTransferStatus] = useState('');
  const [beneficiaryStatus, setBeneficiaryStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBeneficiary, setSearchBeneficiary] = useState('');
  const [action, setAction] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userStatus, setUserStatus] = useState('');
  const [userRole, setUserRole] = useState('');
  const { updated, updating, canceled } = useSelector((state) => state.userStatus);
  const { modified, modifying, terminated } = useSelector((state) => state.userRole);
  const user = progress?.user;
  const userTransfers = progress?.transfers;
  const userBeneficiaries = progress?.beneficiaries;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transferEmpty = () => {
    if (userTransfers?.length == 0) {
      setTransferStatus('No transfers have been made by this user')
    }
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBeneficiarySearch = (event) => {
    setSearchBeneficiary(event.target.value);
  };

  const beneficiaryEmpty = () => {
    if (userBeneficiaries?.length == 0) {
      setBeneficiaryStatus('No beneficiaries have been saved by this user')
    }
  }

  const handleAction = () => {
    setAction(!action);
  }

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  const removeUser = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    if (success) {
      navigate('/users')
    }
  }, [success])

  useEffect(() => {
    transferEmpty();
    beneficiaryEmpty();
  }, [userTransfers]);

  const handleUserStatusUpdate = () => {
    if (userStatus !== '') {
      dispatch(
        updateUserStatus({
          user: {
            id: user?.id,
            status: userStatus,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (updated) {
      navigate('/users')
    }
  }, [updated])

  const handleUserRoleUpdate = () => {
    if (userRole !== '') {
      dispatch(
        updateUserRole({
          user: {
            id: user?.id,
            role: userRole,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (modified) {
      navigate('/users')
    }
  }, [modified])

  const formatTime = (timestamp) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  };

  const totalAmount = userTransfers?.reduce((total, transfer) => {
    return total + parseInt(transfer.amount);
  }, 0);

  return (
    <div>
      <div className={!deleteModal ? 'hidden' : 'block w-full h-full p-6 fixed top-0 bg-[#000000ca]'}>
        <div className='bg-[#fff] rounded-[24px] recipientModal md:w-[40%] p-6 absolute top-[40%] md:left-[20%]'>
          <p className="text-center">Are you sure you want to delete this user?</p>
          <div className="flex justify-center gap-4 items-center">
            <button
              className="bg-[#37A13C] text-[#fff] py-[2px] px-4 rounded-[7px]"
              type="button" onClick={() => handleDeleteModal()}>No</button>
            <button
              className="bg-[#C50713] text-[#fff] py-[2px] px-4 rounded-[7px]"
              type="button"
              onClick={() => removeUser(user?.id)}
            >{
                pending ? 'deleting...' :
                  error ? 'failed' :
                    success ? 'User deleted' :
                      'Yes'
              }
            </button>
          </div>
        </div>
      </div>
      <div className="px-6">
        {
          loading ? (<>loading...</>)
            : failed ? (<>An error occured</>)
              : user ? (
                <>
                  <div className="my-[4%]">
                    <h1 className="text-[40px] text-[#464646]">{user?.first_name}&apos;s details: <span className="text-[#966BE9]">{user?.first_name} {user?.last_name}</span></h1>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-2 justify-between items-center w-full p-4 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
                    <div>
                      <p className="text-[16px] text-[#909090] font-[600]">Transaction Completed</p>
                      <small className="text-[#212121] text-[16px]">{userTransfers?.length}</small>
                    </div>
                    <div>
                      <p className="text-[16px] text-[#909090] font-[600]">Total amount sent</p>
                      <small className="text-[#212121] text-[16px]">{totalAmount}GPB</small>
                    </div>
                    <div>
                      <p className="text-[16px] text-[#909090] font-[600]">
                        Active status:
                        <span className={user?.status == "Active" ? 'text-[#37A13C] pl-2' : 'text-[#C50713] pl-2'}>
                          {user?.status}
                        </span>
                      </p>
                      <select
                        value={userStatus}
                        onChange={(e) => setUserStatus(e.target.value)}
                      >
                        <option value="">update status</option>
                        <option value="Active">Active</option>
                        <option value="Disabled">Suspend</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-[16px] text-[#909090] font-[600]">user role:
                        <span className="text-[#814DE5] pl-2">{user?.role}</span>
                      </p>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                      >
                        <option value="">update role</option>
                        <option value="admin">admin</option>
                        <option value="customer">customer</option>
                        <option value="support">support</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-[16px] text-[#909090] font-[600]">Action</p>
                      <button type="button" onClick={() => handleAction()} className="text-[#212121] text-[16px]">. . .</button>
                      <div className={!action ? 'hidden' : 'block flex flex-col'}>
                        <button onClick={() => handleDeleteModal()}>Delete user</button>
                        {/* <button onClick={() => handleSuspendModal()}>Suspend user</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="my-6">
                    <h1 className="pb-4 text-[#464646] text-[20px] font-extrabold">{user?.first_name}&apos;s Information</h1>
                    <div className="user_container p-4 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
                      <div className="">
                        <div className="flex pb-4 gap-4  items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Country:</p>
                          <small className="text-[#212121] text-[16px]">{user?.country}</small>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex pb-4 gap-4 items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Name of user:</p>
                          <small className="text-[#212121] text-[16px]">{user?.first_name} {user?.last_name}</small>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex pb-4 gap-4  items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Email Address:</p>
                          <small className="text-[#212121] text-[16px]">{user?.email}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
                : <>User empty</>
        }
        <div className="my-6">
          <div className={transferStatus ? "hidden" : "flex items-center gap-4 py-4"}>
            <h1 className='block text-[#464646] text-[20px] font-extrabold'>{user?.first_name}&apos;s transactions</h1>
            <div className="flex items-center justify-end user_container gap-2 border-[1px] border-[#909090] rounded-[8px] px-[24px]">
              <AiOutlineSearch />
              <input
                type="search"
                className="border-none py-[12px] bg-transparent focus:outline-none"
                placeholder="search"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          {
            loading ? (<>Loading transfer...</>)
              : failed ? (<>An error occured while loading transfer</>)
                : userTransfers ? (
                  userTransfers.filter((transfer) =>
                    transfer.recipient_name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((transfer) => (
                    <div className="py-2" key={transfer.id}>
                      <div className="user_container p-4 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
                        <div className="">
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Amount sent:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.amount} GBP</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Recipient name:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.recipient_name}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Recipient account:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.recipient_account}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Recipient bank:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.recipient_bank}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Recipient phone:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.recipient_phone}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Fee:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.fee}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Status:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.status}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Reference number:</p>
                            <small className="text-[#212121] text-[16px]">{transfer.reference_number}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Day of Transaction:</p>
                            <small className="text-[#212121] text-[16px]">{formatDate(transfer.created_at)}, {formatTime(transfer.created_at)}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
                  : ''
          }
        </div>
        <div className="my-6">
          <div className={transferStatus ? "hidden" : "flex items-center gap-4 py-4"}>
            <h1 className='block text-[#464646] text-[20px] font-extrabold'>{user?.first_name}&apos;s Beneficiaries</h1>
            <div className="flex items-center justify-end user_container gap-2 border-[1px] border-[#909090] rounded-[8px] px-[24px]">
              <AiOutlineSearch />
              <input
                type="search"
                className="border-none py-[12px] bg-transparent focus:outline-none"
                placeholder="search"
                value={searchBeneficiary}
                onChange={handleBeneficiarySearch}
              />
            </div>
          </div>
          {
            loading ? (<>loading beneficiaries...</>)
              : failed ? (<>An error occured while loading beneficiaries</>)
                : userBeneficiaries ? (
                  userBeneficiaries.filter((beneficiary) =>
                    beneficiary.account_name.toLowerCase().includes(searchBeneficiary.toLowerCase())
                  ).map((beneficiary) => (
                    <div className="py-2" key={beneficiary.id}>
                      <div className="user_container p-4 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
                        <div className="">
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Benficiary name:</p>
                            <small className="text-[#212121] text-[16px]">{beneficiary.account_name}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Benficiary account:</p>
                            <small className="text-[#212121] text-[16px]">{beneficiary.account_number}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Benficiary bank:</p>
                            <small className="text-[#212121] text-[16px]">{beneficiary.bank_name}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Benficiary phone:</p>
                            <small className="text-[#212121] text-[16px]">{beneficiary.phone_number}</small>
                          </div>
                          <div className="flex pb-4 gap-4 items-center">
                            <p className="text-[16px] text-[#909090] font-[600]">Created at:</p>
                            <small className="text-[#212121] text-[16px]">{formatDate(beneficiary.created_at)}, {formatTime(beneficiary.created_at)}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
                  : ''
          }
        </div>
        <div className="my-6">
          <h1 className="pb-4 text-[#464646] text-[20px] font-extrabold">Additional information</h1>
          {
            loading ? (<>loading...</>)
              : failed ? (<>An error occured</>)
                : user ? (
                  <>
                    <div className="user_container p-4 bg-[#fff] border-[1px] border-[#E6E6E6] rounded-[24px]">
                      <div className="">
                        <div className="flex pb-4 gap-4 items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Date and time joined:</p>
                          <small className="text-[#212121] text-[16px]">24th may 2023, 11pm</small>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex pb-4 gap-4 items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">Last login:</p>
                          <small className="text-[#212121] text-[16px]">{formatDate(user?.last_login)}, {formatTime(user?.last_login)}</small>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex pb-4 gap-4 items-center">
                          <p className="text-[16px] text-[#909090] font-[600]">verified:</p>
                          <small className="text-[#814DE5] text-[16px]">{user?.verified ? 'true' : 'false'}</small>
                        </div>
                      </div>
                    </div>
                  </>
                )
                  : <>User empty</>
          }
        </div>
        <p className="text-[15px] text-[#909090] font-[600]">{transferStatus}</p>
        <p className="text-[15px] text-[#909090] font-[600]">{beneficiaryStatus}</p>
        <div className="md:w-[40%] m-auto flex flex-wrap gap-4 items-center">
          <button
            onClick={() => handleUserStatusUpdate()}
            type="submit"
            className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
          >
            {
              updating ? 'updating...' : updated ? 'status updated' : canceled ? 'status update failed' : 'Update user status'
            }
          </button>
          <button
            onClick={() => handleUserRoleUpdate()}
            type="submit"
            className="p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center"
          >
            {
              modifying ? 'updating...' : modified ? 'Role updated' : terminated ? 'Role update failed' : 'Update user role'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersLists;
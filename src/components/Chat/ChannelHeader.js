import React from 'react';

const ChannelHeader = ({ otherPerson }) => {
  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="col-6 receiver-profil">
          {otherPerson && (
            <>
              <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                <img
                  src={`https://localhost:7019/${otherPerson.person_ProfilPicturePath}`}
                  alt="avatar"
                />
              </a>
              <div className="chat-about">
                <h6 className="m-b-0">
                  {otherPerson.person_FirstName} {otherPerson.person_LastName}
                </h6>
                <small>{otherPerson.person_Description}</small>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;

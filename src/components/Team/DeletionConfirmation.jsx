import { MemberDeletionContext } from './MemberDeletion';
import React from 'react';

export default function DeletionConfirmation() {

    const { open, handleClose, setModal } = React.useContext(MemberDeletionContext);

    return (
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
            onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl font-semibold text-center mb-6">
                    Reassign Active Tasks
                </h2>

                {/* Read-only message box for Active Sprint */}
                <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                    <p className="text-gray-700">
                        Are you sure you want to delete this member?
                    </p>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handleClose()}
                        className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setModal(2)}
                        className="bg-primaryColor  font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-200"
                    >
                        Process
                    </button>
                </div>
            </div>

    );
}
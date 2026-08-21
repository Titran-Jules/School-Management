import { useState } from 'react';
import { Logout } from '../../ui/Logout';
import { TeachersTable } from '../../TeachersTable';
import { StudentModal } from '../../StudentModal';
import { TeacherModal } from '../../TeacherModal';
import { useSchoolData } from '../../../hooks/useSchoolData';
import { StatCards } from '../../StatCard';
import { RegisterTabs } from '../../RegisterTabs';
import { StudentsTable } from '../../StudentsTable';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'students' | 'teachers'>('students');
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [showTeacherModal, setShowTeacherModal] = useState(false);

    const {
        students, teachers, ues, loading, error,
        createStudent, createTeacher, deleteStudent, deleteTeacher,
    } = useSchoolData();

    return (
        <div className="min-h-screen bg-var(--paper) text-var(--ink) font-body antialiased">
        <main className="max-w-6xl mx-auto px-6 py-8">
            <StatCards
                studentCount={students.length}
                teacherCount={teachers.length}
                ueCount={ues.length}
            />
            {error && (
            <div className="mb-6 p-4 rounded-sm bg-var(--rust-dim) border border-var(--rust)/30 text-var(--rust) text-sm">
                {error}
            </div>
            )}

            <RegisterTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                studentCount={students.length}
                teacherCount={teachers.length}
                onRegister={() => (activeTab === 'students' ? setShowStudentModal(true) : setShowTeacherModal(true))}
            />

            <div className="bg-var(--paper-raised) border border-var(--rule) rounded-sm rounded-tl-none overflow-hidden">
            {activeTab === 'students' ? (
                <StudentsTable students={students} loading={loading} onDelete={deleteStudent} />
            ) : (
                <TeachersTable teachers={teachers} loading={loading} onDelete={deleteTeacher} />
            )}
            </div>
        </main>

        {showStudentModal && (
            <StudentModal onClose={() => setShowStudentModal(false)} onCreate={createStudent} />
        )}
        {showTeacherModal && (
            <TeacherModal ues={ues} onClose={() => setShowTeacherModal(false)} onCreate={createTeacher} />
        )}
        <div className='w-screen flex justify-center absolute bottom-10'>
            <Logout />
        </div>
        </div>
    );
}
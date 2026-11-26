import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { EventItem, RegistrationPayload, RegistrationRecord } from '../../types';
import { RegistrationConfirmation } from './RegistrationConfirmation';
import { useNotification } from '../../context/NotificationContext';
import { GlassSelect } from '../common/GlassSelect';
import { MapPin } from 'lucide-react';
import { useSectionChoreography } from '../../hooks/useSectionChoreography';
import { ScrollTextReveal } from '../common/ScrollTextReveal';

const YEAR_SEMESTER_OPTIONS = [
  '1st Year / Semester 1',
  '1st Year / Semester 2',
  '2nd Year / Semester 3',
  '2nd Year / Semester 4',
  '3rd Year / Semester 5',
  '3rd Year / Semester 6',
  '4th Year / Semester 7',
  '4th Year / Semester 8',
];

interface RegistrationSectionProps {
  events: EventItem[];
  preselectedEventId?: string | null;
  ourCollegeName?: string;
  onOpenSubmission: (registration?: RegistrationRecord) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  events,
  preselectedEventId,
  onOpenSubmission,
}) => {
  const { showNotification } = useNotification();
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionChoreography(sectionRef);
  // Strictly 2 types of registrations: 'visitor' and 'showcasing' (Both 100% Free)
  const [selectedPass, setSelectedPass] = useState<'visitor' | 'showcasing'>('visitor');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRegistration, setConfirmedRegistration] = useState<RegistrationRecord | null>(null);
  const [formFeedback, setFormFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('LJCCA');
  const [isInternalCollege, setIsInternalCollege] = useState(true);
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('BCA');
  const [yearSemester, setYearSemester] = useState(YEAR_SEMESTER_OPTIONS[0]);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [isParentAttendee, setIsParentAttendee] = useState(false);

  const registrableEvents = events.filter(
    (e) => e.registration_status !== 'announced' && e.eligibility_type !== 'results_only'
  );

  const showcaseEvents = registrableEvents.filter((e) => e.is_showcase);
  const availableEvents =
    !isInternalCollege || selectedPass === 'showcasing'
      ? showcaseEvents
      : registrableEvents;

  useEffect(() => {
    const validEvents =
      !isInternalCollege || selectedPass === 'showcasing'
        ? showcaseEvents
        : registrableEvents;

    setSelectedEventId((prev) => {
      // If a preselected event was provided and it's valid for this student type, use it
      if (preselectedEventId && validEvents.some((e) => e.id === preselectedEventId)) {
        return preselectedEventId;
      }
      // If current selection is still valid among the available events, keep it
      if (prev && validEvents.some((e) => e.id === prev)) {
        return prev;
      }
      // Otherwise fallback to the first valid event
      return validEvents[0]?.id || '';
    });
  }, [preselectedEventId, registrableEvents, selectedPass, isInternalCollege]);

  const currentEvent = events.find((e) => e.id === selectedEventId);
  const isInternalOnly = currentEvent?.eligibility_type === 'internal_only';
  const isHackathon = currentEvent?.is_hackathon;
  const isParentWorkshop = currentEvent?.eligibility_type === 'parents_only';

  const handleCollegeToggle = (isInternal: boolean) => {
    setIsInternalCollege(isInternal);
    if (isInternal) {
      setCollegeName('LJCCA');
      setDepartment('BCA');
    } else {
      setCollegeName('');
      setDepartment('Computer Science & Engineering');
      setRollNumber('');
      if (!showcaseEvents.some((e) => e.id === selectedEventId)) {
        if (showcaseEvents.length > 0) {
          setSelectedEventId(showcaseEvents[0].id);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !collegeName.trim()) {
      setFormFeedback({
        isError: true,
        message: 'Please fill in all mandatory fields: Full Name, Email, Phone, and College Name.',
      });
      return;
    }

    if (isInternalCollege && !rollNumber.trim()) {
      setFormFeedback({
        isError: true,
        message: 'Please enter your Roll Number for LJCCA verification.',
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormFeedback({
        isError: true,
        message: 'Please enter a valid email address.',
      });
      return;
    }

    const cleanDigits = phone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      setFormFeedback({
        isError: true,
        message: 'Please enter a valid 10-digit phone number for WhatsApp confirmation.',
      });
      return;
    }

    // Strict Eligibility Rule Enforcement
    if (!isInternalCollege && !currentEvent?.is_showcase) {
      const msg = `External college students can only select from Tech Showcase days. Please select Day 1 or Day 2 of the Tech Showcase.`;
      setFormFeedback({ isError: true, message: msg });
      showNotification('error', 'Participation Restricted', msg);
      return;
    }

    if (isInternalOnly && !isInternalCollege) {
      const msg = `${currentEvent?.name || 'This event'} is strictly reserved for students of our college. External students can participate ONLY in the Tech Showcase.`;
      setFormFeedback({ isError: true, message: msg });
      showNotification('error', 'Participation Restricted', msg);
      return;
    }

    if (isHackathon && !teamName.trim()) {
      setFormFeedback({
        isError: true,
        message: 'A Team Name is required for Hackathon registrations.',
      });
      return;
    }

    if (isParentWorkshop && !isParentAttendee) {
      setFormFeedback({
        isError: true,
        message: 'Please confirm that you are registering as a parent or guardian.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: RegistrationPayload = {
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college_name: isInternalCollege ? 'LJCCA' : collegeName.trim(),
        roll_number: isInternalCollege ? rollNumber.trim() : undefined,
        department: isInternalCollege ? 'BCA' : department.trim(),
        year_semester: yearSemester.trim(),
        event_id: selectedEventId,
        registration_type: selectedPass,
        team_name: isHackathon || selectedPass === 'showcasing' ? teamName.trim() : undefined,
        team_members: isHackathon || selectedPass === 'showcasing' ? teamMembers.trim() : undefined,
      };

      const res = await api.createRegistration(payload);
      setConfirmedRegistration(res);

      if (selectedPass === 'showcasing') {
        setFormFeedback({
          isError: false,
          message: `Registration received for ${res.full_name}! Registration ID: ${res.reg_code}. The administrator has been notified by email for approval. Once approved, you will receive project submission access.`,
        });
        showNotification('success', 'Showcasing Request Sent', `ID: ${res.reg_code}`);
      } else {
        setFormFeedback({
          isError: false,
          message: `Visitor pass reserved for ${res.full_name}! Registration ID: ${res.reg_code}. Free Entry.`,
        });
        showNotification('success', 'Visitor Pass Confirmed', `ID: ${res.reg_code}`);
      }
    } catch (err: any) {
      const detail = err.response?.data?.detail || err.message || 'Registration failed. Please verify your details.';
      setFormFeedback({ isError: true, message: detail });
      showNotification('error', 'Registration Error', detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#1A0B14] via-[#2A1020] to-[#160812] overflow-hidden" id="register">
      {/* Hogwarts Admission Burgundy Glow & Constellation */}
      <div 
        data-parallax-y="24"
        className="absolute inset-0 pointer-events-none opacity-30 z-0 will-change-transform"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(180, 40, 70, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 75% 75%, rgba(214, 179, 106, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#D6B36A 1px, transparent 1px), linear-gradient(90deg, #D6B36A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div data-reveal className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border-1.5 border-[#D6B36A] bg-[#2C0E20] shadow-[0_0_15px_rgba(214,179,106,0.2),2px_2px_0px_#10050C] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_6px_#FF5470]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#F3D58A] tracking-widest uppercase font-bold">
              ✦ HOGWARTS ADMISSION // 100% FREE PASSES ✦
            </span>
          </div>

          <ScrollTextReveal
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#F4EBDD] tracking-tight leading-tight"
            segments={[
              { text: 'Reserve Your' },
              {
                text: 'Place.',
                className: 'text-[#F3D58A] underline decoration-[#E63946] decoration-wavy decoration-2',
              },
            ]}
          />
        </div>

        {confirmedRegistration ? (
          <RegistrationConfirmation
            registration={confirmedRegistration}
            onReset={() => {
              setConfirmedRegistration(null);
              setFormFeedback(null);
            }}
            onOpenSubmission={(reg) => onOpenSubmission(reg)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Choose Pass Tier & Guidance (Enchanted Pass Cards) */}
            <div data-reveal data-reveal-delay="0.04" className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#F4EBDD] mb-1.5 tracking-wide">
                  Select Your Festival Pass
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#E2CCD4] leading-relaxed font-normal">
                  Both passes grant 100% free admission to the festival grounds at LJCCA, Vastrapur, Ahmedabad.
                </p>
              </div>

              {/* Pass Tier Selection Cards: Enchanted Grimoire Passes */}
              <div className="space-y-3">
                {/* Tier 1: Visitor */}
                <div
                  onClick={() => setSelectedPass('visitor')}
                  className={`p-4 rounded-sm border-2 transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                    selectedPass === 'visitor'
                      ? 'bg-[#331326] border-[#F3D58A] shadow-[0_0_20px_rgba(214,179,106,0.35),3.5px_3.5px_0px_#10050C] -translate-y-0.5'
                      : 'bg-[#240C1B] border-[#D6B36A]/40 shadow-[0_4px_16px_rgba(0,0,0,0.5),2.5px_2.5px_0px_#10050C] hover:border-[#D6B36A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="pass-type"
                        value="visitor"
                        checked={selectedPass === 'visitor'}
                        onChange={() => setSelectedPass('visitor')}
                        className="accent-[#D6B36A] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="font-cinzel font-bold text-lg text-[#F4EBDD] tracking-wide">
                        Visitor Pass
                      </div>
                      <div className="font-body text-xs text-[#E2CCD4] font-normal mt-1">
                        Access to open talks, demonstration exhibits, and public viewing
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-sm bg-[#D6B36A] text-[#100D18] border border-[#F3D58A] shadow-[0_0_8px_rgba(214,179,106,0.3)]">
                    FREE
                  </span>
                </div>

                {/* Tier 2: Project Showcasing */}
                <div
                  onClick={() => setSelectedPass('showcasing')}
                  className={`p-4 rounded-sm border-2 transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                    selectedPass === 'showcasing'
                      ? 'bg-[#331326] border-[#F3D58A] shadow-[0_0_20px_rgba(214,179,106,0.35),3.5px_3.5px_0px_#10050C] -translate-y-0.5'
                      : 'bg-[#240C1B] border-[#D6B36A]/40 shadow-[0_4px_16px_rgba(0,0,0,0.5),2.5px_2.5px_0px_#10050C] hover:border-[#D6B36A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="pass-type"
                        value="showcasing"
                        checked={selectedPass === 'showcasing'}
                        onChange={() => setSelectedPass('showcasing')}
                        className="accent-[#D6B36A] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="font-cinzel font-bold text-base sm:text-lg text-[#F4EBDD] tracking-wide">
                        Project Showcasing Pass
                      </div>
                      <div className="font-body text-xs text-[#E2CCD4] font-normal mt-0.5">
                        Hardware &amp; Software booth exhibition stall (Requires Admin Verification)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-sm bg-[#762E42] text-[#F3D58A] border border-[#D6B36A] shadow-[0_0_8px_rgba(118,46,66,0.4)]">
                    FREE
                  </span>
                </div>
              </div>

              {/* Location Reference Badge */}
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E2CCD4] bg-[#240C1B] p-2.5 sm:p-3 rounded-sm border-2 border-[#D6B36A]/40 shadow-[2px_2px_0px_#10050C]">
                <MapPin className="w-3.5 h-3.5 text-[#F3D58A]" />
                <span className="text-[#F4EBDD]">LJCCA, Vastrapur, Ahmedabad · 18–24 Jan 2027</span>
              </div>

              {/* Showcasing Workflow Advisory */}
              <div className="p-4 sm:p-4.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#240C1B] shadow-[0_8px_25px_rgba(0,0,0,0.5),2.5px_2.5px_0px_#10050C] font-mono text-xs text-[#E2CCD4]">
                <div className="font-black text-[#F4EBDD] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_6px_#FF5470]" />
                  <span>How Project Showcasing Works:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 leading-relaxed font-normal">
                  <li>Select <strong>Project Showcasing</strong> and submit your team details.</li>
                  <li>Festival review administrators verify your submission via admin portal.</li>
                  <li>Upon approval, you receive a direct link to submit prototype specifications.</li>
                  <li>Real-time confirmation dispatch is sent to your WhatsApp number.</li>
                </ol>
              </div>
            </div>

            {/* Right Column: Registration Form in Pure Enchanted Parchment Dossier */}
            <form data-reveal data-reveal-delay="0.14" onSubmit={handleSubmit} noValidate className="lg:col-span-7 rounded-sm border-2 border-[#D6B36A] bg-[#240C1B] p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.7),4px_4px_0px_#10050C] relative">
              {/* Crimson Wax Seal Ribbon */}
              <div
                className="absolute -top-3.5 right-12 px-4 py-1 bg-gradient-to-r from-[#762E42] to-[#4A1525] border-x border-b border-[#D6B36A] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-10 flex items-center gap-1.5"
                style={{ transform: 'rotate(2deg)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A]" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#F3D58A] font-bold">
                  ENCHANTED PARCHMENT
                </span>
              </div>

              <h3 className="font-display font-black text-xl text-[#F4EBDD] mb-4 sm:mb-5">
                Enter Registration Details
              </h3>

              {/* Festival Event Dropdown */}
              <div className="mb-5">
                <label className="block font-mono text-xs text-[#F4EBDD] mb-2 font-bold uppercase tracking-wider">
                  Selected Festival Event *
                </label>
                <GlassSelect
                  value={selectedEventId}
                  onChange={setSelectedEventId}
                  options={availableEvents.map((ev) => ({
                    value: ev.id,
                    label: ev.name,
                    sublabel: ev.date_display,
                    badge: ev.eligibility_type === 'internal_only' ? 'College Only' : ev.eligibility_type === 'parents_only' ? 'Parents' : 'All Colleges',
                  }))}
                />
                {!isInternalCollege && (
                  <span className="block font-mono text-[11px] text-[#C2BDCA] font-normal mt-1.5">
                    External college students can only select from Tech Showcase days (Day 1 &amp; Day 2).
                  </span>
                )}
              </div>

              {/* College Affiliation Selector */}
              <div className="mb-5">
                <label className="block font-mono text-xs text-[#F4EBDD] mb-2 font-bold uppercase tracking-wider">
                  Student Affiliation *
                </label>
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleCollegeToggle(true)}
                    className={`py-2.5 px-4 rounded-sm border-2 font-black transition-all cursor-pointer ${
                      isInternalCollege
                        ? 'bg-[#D6B36A] text-[#100D18] border-[#F3D58A] shadow-[0_0_12px_rgba(214,179,106,0.3),2px_2px_0px_#100D18]'
                        : 'bg-[#1E192D] text-[#C2BDCA] border-[#D6B36A]/40 hover:text-[#F4EBDD]'
                    }`}
                  >
                    Our College Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCollegeToggle(false)}
                    className={`py-2.5 px-4 rounded-sm border-2 font-black transition-all cursor-pointer ${
                      !isInternalCollege
                        ? 'bg-[#D6B36A] text-[#100D18] border-[#F3D58A] shadow-[0_0_12px_rgba(214,179,106,0.3),2px_2px_0px_#100D18]'
                        : 'bg-[#1E192D] text-[#C2BDCA] border-[#D6B36A]/40 hover:text-[#F4EBDD]'
                    }`}
                  >
                    External College Student
                  </button>
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#181424] text-[#F4EBDD] font-body text-sm focus:outline-none focus:border-[#D6B36A] focus:shadow-[0_0_12px_rgba(214,179,106,0.3)] transition-colors shadow-[2px_2px_0px_#100D18]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@college.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#181424] text-[#F4EBDD] font-body text-sm focus:outline-none focus:border-[#D6B36A] focus:shadow-[0_0_12px_rgba(214,179,106,0.3)] transition-colors shadow-[2px_2px_0px_#100D18]"
                  />
                </div>
              </div>

              {/* Phone (WhatsApp) & College Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#181424] text-[#F4EBDD] font-body text-sm focus:outline-none focus:border-[#D6B36A] focus:shadow-[0_0_12px_rgba(214,179,106,0.3)] transition-colors shadow-[2px_2px_0px_#100D18]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                    College Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="College / University Name"
                    readOnly={isInternalCollege}
                    className={`w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 text-[#F4EBDD] font-body text-sm focus:outline-none transition-colors shadow-[2px_2px_0px_#100D18] ${
                      isInternalCollege
                        ? 'bg-[#1E192D] text-[#C2BDCA] cursor-not-allowed'
                        : 'bg-[#181424] focus:border-[#D6B36A]'
                    }`}
                  />
                </div>
              </div>

              {/* Roll Number (for internal) & Department & Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {isInternalCollege && (
                  <div>
                    <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                      Roll Number (LJCCA) *
                    </label>
                    <input
                      type="text"
                      required
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. 23BCA101"
                      className="w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#181424] text-[#F4EBDD] font-body text-sm focus:outline-none focus:border-[#D6B36A] focus:shadow-[0_0_12px_rgba(214,179,106,0.3)] transition-colors shadow-[2px_2px_0px_#100D18]"
                    />
                  </div>
                )}

                <div className={!isInternalCollege ? 'sm:col-span-1' : ''}>
                  <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                    Department {isInternalCollege ? '(Locked to BCA)' : ''}
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science"
                    readOnly={isInternalCollege}
                    className={`w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 text-[#F4EBDD] font-body text-sm focus:outline-none transition-colors shadow-[2px_2px_0px_#100D18] ${
                      isInternalCollege
                        ? 'bg-[#1E192D] text-[#C2BDCA] cursor-not-allowed'
                        : 'bg-[#181424] focus:border-[#D6B36A]'
                    }`}
                  />
                </div>

                <div className={!isInternalCollege ? 'sm:col-span-2' : ''}>
                  <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                    Year / Semester *
                  </label>
                  <GlassSelect
                    value={yearSemester}
                    onChange={setYearSemester}
                    options={YEAR_SEMESTER_OPTIONS}
                  />
                </div>
              </div>

              {/* Team Name for Showcasing or Hackathons */}
              {(selectedPass === 'showcasing' || isHackathon) && (
                <div className="border-t-2 border-dashed border-[#D6B36A]/25 pt-4 mt-4 space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                      Team / Project Name {selectedPass === 'showcasing' ? '(Optional)' : '*'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Quantum Innovators"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#181424] text-[#F4EBDD] font-body text-sm focus:outline-none focus:border-[#D6B36A] focus:shadow-[0_0_12px_rgba(214,179,106,0.3)] transition-colors shadow-[2px_2px_0px_#100D18]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#F4EBDD] mb-1.5 font-bold uppercase tracking-wider">
                      Team Member Names (if group project)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alice Smith, Bob Chen"
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm border-2 border-[#D6B36A]/40 bg-[#181424] text-[#F4EBDD] font-body text-sm focus:outline-none focus:border-[#D6B36A] focus:shadow-[0_0_12px_rgba(214,179,106,0.3)] transition-colors shadow-[2px_2px_0px_#100D18]"
                    />
                  </div>
                </div>
              )}

              {/* Conditional Parent Checkbox */}
              {isParentWorkshop && (
                <div className="my-4 p-4 rounded-sm border-2 border-[#D6B36A] bg-[#1E192D] shadow-[2.5px_2.5px_0px_#100D18] flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="parent-check"
                    checked={isParentAttendee}
                    onChange={(e) => setIsParentAttendee(e.target.checked)}
                    className="accent-[#D6B36A] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="parent-check" className="font-body text-xs sm:text-sm text-[#F4EBDD] font-bold cursor-pointer">
                    I confirm that I am attending as a parent or guardian of a student.
                  </label>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-5 py-3.5 px-5 rounded-sm font-cinzel font-bold text-xs sm:text-sm tracking-wider text-[#100D18] bg-gradient-to-r from-[#D6B36A] via-[#F3D58A] to-[#D6B36A] hover:bg-[#F3D58A] border-2 border-[#F3D58A] shadow-[0_0_20px_rgba(214,179,106,0.4),3.5px_3.5px_0px_#100D18] hover:shadow-[0_0_30px_rgba(243,213,138,0.6),5px_5px_0px_#100D18] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? 'PROCESSING HOGWARTS ADMISSION...'
                    : selectedPass === 'showcasing'
                    ? 'REQUEST PROJECT SHOWCASING PASS (FREE) →'
                    : 'RESERVE VISITOR PASS (FREE) →'}
                </span>
              </button>

              {/* Form Feedback Alert Box */}
              {formFeedback && (
                <div
                  role="status"
                  className={`mt-4 p-4 rounded-sm border-2 font-mono text-xs font-bold leading-relaxed shadow-[3px_3px_0px_#100D18] ${
                    formFeedback.isError
                      ? 'border-[#762E42] bg-[#351522] text-[#F3D58A]'
                      : 'border-[#D6B36A] bg-[#1E192D] text-[#F3D58A] shadow-[0_0_15px_rgba(214,179,106,0.25)]'
                  }`}
                >
                  {formFeedback.message}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

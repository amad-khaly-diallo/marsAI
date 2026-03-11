import React from 'react';
import {
  ShieldCheck,
  UserPlus,
  Copyright,
  BrainCircuit,
  MessageCircle,
  FileText,
} from 'lucide-react';

export const getLegalData = (t) => [
  {
    id: 1,
    side: 'left',
    title: t('cgu.sections.service.title'),
    desc: t('cgu.sections.service.desc'),
    icon: <FileText className="text-pink-500" size={50} />,
  },
  {
    id: 2,
    side: 'right',
    title: t('cgu.sections.ip.title'),
    desc: t('cgu.sections.ip.desc'),
    icon: <Copyright className="text-blue-400" size={50} />,
  },
  {
    id: 3,
    side: 'left',
    title: t('cgu.sections.access.title'),
    desc: t('cgu.sections.access.desc'),
    icon: <UserPlus className="text-pink-500" size={50} />,
  },
  {
    id: 4,
    side: 'right',
    title: t('cgu.sections.ethics.title'),
    desc: t('cgu.sections.ethics.desc'),
    icon: <BrainCircuit className="text-blue-400" size={50} />,
  },
  {
    id: 5,
    side: 'left',
    title: t('cgu.sections.data.title'),
    desc: t('cgu.sections.data.desc'),
    icon: <ShieldCheck className="text-pink-500" size={50} />,
  },
  {
    id: 6,
    side: 'right',
    title: t('cgu.sections.contact.title'),
    desc: t('cgu.sections.contact.desc'),
    icon: <MessageCircle className="text-blue-400" size={50} />,
  },
];

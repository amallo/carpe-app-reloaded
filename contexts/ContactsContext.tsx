'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Contact } from '@/data/sampleData';
import { contacts as initialContacts } from '@/data/sampleData';

type AddContactInput = Omit<Contact, 'id' | 'status'> & { status?: Contact['status'] };

interface ContactsContextValue {
  contacts: Contact[];
  addContact: (input: AddContactInput) => Contact;
  getContactById: (id: string) => Contact | undefined;
}

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const addContact = useCallback((input: AddContactInput) => {
    const id = `contact-${Date.now()}`;
    const newContact: Contact = {
      ...input,
      id,
      status: input.status ?? 'offline',
    };
    setContacts((prev) => {
      const exists = prev.some((c) => c.uniqueId === input.uniqueId);
      if (exists) return prev;
      return [...prev, newContact];
    });
    return newContact;
  }, []);

  const getContactById = useCallback(
    (id: string) => contacts.find((c) => c.id === id),
    [contacts]
  );

  const value = useMemo<ContactsContextValue>(
    () => ({ contacts, addContact, getContactById }),
    [contacts, addContact, getContactById]
  );

  return (
    <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContacts must be used within ContactsProvider');
  return ctx;
}

import React from 'react';
import { Layout, Text, Card, Divider } from '@ui-kitten/components';
import _ from 'underscore';

export const ResumenClass = ({ fecha, hora, count, notes }) => (
  <>
    <Layout style={{ margin: 10 }}>
      <Text category="h6" style={{ padding: 4 }}>
        Fecha: {fecha}
      </Text>
      <Text category="h6" style={{ padding: 4 }}>
        Hora: {hora}
      </Text>
      <Text category="h6" style={{ padding: 4 }}>
        Empieza {count}
      </Text>
    </Layout>
    <Divider />
    {!_.isEmpty(notes) ? (
      <Card
        header={() => (
          <Text style={styles.notesCard} category="h6">
            Notas
          </Text>
        )}>
        <Text>{notes[0].message}</Text>
      </Card>
    ) : null}
  </>
);

const styles = {
  notesCard: { margin: 10, alignSelf: 'flex-start' },
};

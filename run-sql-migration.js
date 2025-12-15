import pg from 'pg'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Client } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function runMigration() {
  const client = new Client({
    host: 'db.wtaeelzwseauckgwitix.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres.wtaeelzwseauckgwitix',
    password: 'Sagedirect25!',
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 30000
  })

  try {
    console.log('🔌 Conectando ao Supabase...')
    await client.connect()
    console.log('✅ Conectado com sucesso!')

    console.log('📄 Lendo arquivo SQL...')
    const sqlFile = fs.readFileSync(join(__dirname, 'supabase_schema.sql'), 'utf8')

    console.log('🚀 Executando migração...')
    await client.query(sqlFile)

    console.log('✅ Migração executada com sucesso!')
    console.log('\n📊 Verificando tabelas criadas...')

    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `)

    console.log('\n✅ Tabelas criadas:')
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })

  } catch (error) {
    console.error('❌ Erro na migração:', error.message)
    if (error.detail) console.error('Detalhes:', error.detail)
    process.exit(1)
  } finally {
    await client.end()
    console.log('\n🔌 Conexão encerrada.')
  }
}

runMigration()

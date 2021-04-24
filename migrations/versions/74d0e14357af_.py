"""empty message

Revision ID: 74d0e14357af
Revises: 834e2a122a0e
Create Date: 2021-04-17 20:02:40.667145

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '74d0e14357af'
down_revision = '834e2a122a0e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('biography', sa.String(length=255), nullable=True),
    sa.Column('photo', sa.String(length=255), nullable=True),
    sa.Column('date_joined', sa.DateTime(), server_default=sa.text('now()')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('favourites',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('car_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['car_id'], ['cars_model.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('users_model')
    op.drop_table('favorites_model')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites_model',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('car_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='favorites_model_pkey')
    )
    op.create_table('users_model',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('password', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('name', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('location', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('biography', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('photo', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('date_joined', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='users_model_pkey'),
    sa.UniqueConstraint('email', name='users_model_email_key'),
    sa.UniqueConstraint('username', name='users_model_username_key')
    )
    op.drop_table('favourites')
    op.drop_table('users')
    # ### end Alembic commands ###

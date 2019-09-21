import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList, Filter, Pagination } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      state: 'open',
      currentPage: 1,
      repoName: '',
      perPage: 5,
    };
  }

  async componentDidMount () {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.name);
    const { state, perPage } = this.state;

    const [issues, repository] = await Promise.all([
      api.get(`repos/${repoName}/issues`, {
        params: {
          state,
          per_page: perPage,
        },
      }),
      api.get(`repos/${repoName}`),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      repoName,
    });
  }

  handleRadioClick = async e => {
    const state = e.target.value;
    this.setState({
      loading: true,
      state,
    });

    const { repoName, perPage } = this.state;

    const issues = await api.get(`repos/${repoName}/issues`, {
      params: {
        state,
        per_page: perPage,
      },
    });

    this.setState({
      loading: false,
      issues: issues.data,
    });
  };

  handlePageButtonClick = async page => {
    this.setState({
      loading: true,
    });

    const { repoName, state, perPage } = this.state;

    const issues = await api.get(`repos/${repoName}/issues`, {
      params: {
        per_page: perPage,
        state,
        page,
      },
    });

    this.setState({
      loading: false,
      issues: issues.data,
      currentPage: page,
    });
  };

  render () {
    const { repository, issues, loading, state, currentPage } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt="Owner Avatar" />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <label htmlFor="open">
            <input
              id="open"
              type="radio"
              name="state"
              value="open"
              checked={state === 'open'}
              onChange={this.handleRadioClick}
            />
            Open
          </label>

          <label htmlFor="closed">
            <input
              id="closed"
              type="radio"
              name="state"
              value="closed"
              checked={state === 'closed'}
              onChange={this.handleRadioClick}
            />
            Closed
          </label>

          <label htmlFor="all">
            <input
              id="all"
              type="radio"
              name="state"
              value="all"
              checked={state === 'all'}
              onChange={this.handleRadioClick}
            />
            All
          </label>
        </Filter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        {(issues.length) ?
          <Pagination currentPage={currentPage}>
            <button onClick={() => this.handlePageButtonClick(currentPage - 1)}>
              &lt;
          </button>
            <button onClick={() => this.handlePageButtonClick(currentPage + 1)}>
              &gt;
          </button>
          </Pagination> : null
        }

      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
